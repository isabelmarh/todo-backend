const request = require("supertest");
const app = require("../server");
const admin = require("firebase-admin");

// Mock Firebase
jest.mock("firebase-admin", () => {
  const firestore = {
    collection: jest.fn().mockReturnThis(),
    get: jest.fn(),
    add: jest.fn(),
    doc: jest.fn().mockReturnThis(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  return {
    initializeApp: jest.fn(),
    credential: { cert: jest.fn() },
    firestore: jest.fn(() => firestore),
  };
});

describe("GET /tasks", () => {
  it("should fetch all tasks", async () => {
    const mockTasks = [
      { id: "1", text: "Test Task 1", completed: false },
      { id: "2", text: "Test Task 2", completed: true },
    ];

    admin
      .firestore()
      .collection()
      .get.mockResolvedValue({
        docs: mockTasks.map((task) => ({
          id: task.id,
          data: () => task,
        })),
      });

    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTasks);
  });
});
