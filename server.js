const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Firebase Admin Initialization
const serviceAccount = require("./firebaseServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.firestore();

// Route to Fetch All Tasks
app.get("/tasks", async (req, res) => {
  console.log("GET /tasks endpoint hit"); // Add this log

  try {
    const tasksSnapshot = await db.collection("tasks").get();
    const tasks = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Error fetching tasks");
  }
});

// Add this POST endpoint after your GET endpoint
app.post("/tasks", async (req, res) => {
  console.log("POST /tasks endpoint hit", req.body); // Debug log

  try {
    const { text, completed } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Task text is required" });
    }

    const newTask = {
      text,
      completed: completed || false,
    };

    const docRef = await db.collection("tasks").add(newTask);

    res.status(201).json({
      id: docRef.id,
      ...newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).send("Error creating task");
  }
});

app.delete("/tasks/:id", async (req, res) => {
  console.log("DELETE /tasks endpoint hit", req.params.id); // Debug log

  try {
    const taskId = req.params.id;

    // Check if task exists
    const taskDoc = await db.collection("tasks").doc(taskId).get();

    if (!taskDoc.exists) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Delete the task
    await db.collection("tasks").doc(taskId).delete();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Error deleting task");
  }
});

app.patch("/tasks/:id", async (req, res) => {
  console.log("PATCH /tasks endpoint hit", req.params.id, req.body); // Debug log

  try {
    const taskId = req.params.id;
    const { completed } = req.body;

    // Check if task exists
    const taskDoc = await db.collection("tasks").doc(taskId).get();

    if (!taskDoc.exists) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the task
    await db.collection("tasks").doc(taskId).update({
      completed: completed,
    });

    // Return the updated task
    const updatedTask = {
      id: taskId,
      ...taskDoc.data(),
      completed: completed,
    };

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Error updating task");
  }
});

// Start Server only if not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app;
