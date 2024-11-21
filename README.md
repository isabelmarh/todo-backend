# TODO Backend

This is the backend for a simple TODO app, built with **Express.js** and **Firebase Firestore**. It provides RESTful APIs to manage tasks, including creating, reading, updating, and deleting tasks.

## Features
- REST API endpoints for managing tasks
- Firebase Firestore integration for data storage
- Supports:
  - Adding new tasks
  - Fetching all tasks
  - Updating task completion status
  - Deleting tasks
- CORS-enabled for frontend integration
- Unit tests for backend routes using Jest and Supertest

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [Firebase Project](https://firebase.google.com/) with Firestore enabled
- A Firebase service account key

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/todo-backend.git
cd todo-backend
```

### 2. Install Dependencies
```bash
npm install
```
### 3. Set Up Environment Variables

Create a .env file in the root of the project and add the following:

```
FIREBASE_DATABASE_URL=https://<your-firebase-project-id>.firebaseio.com
```

### 4. Start the Server
The server will run at http://localhost:5000.

```
node server.js
```

### 5. Running Tests
This project includes unit tests for backend routes.

```
npm test
````
### Project Structure
.
├── server.js               # Express.js server
├── tests/                  # Unit tests for backend routes
├── jest.setup.js           # Jest setup file
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables (not committed)
└── firebaseServiceAccount.json  # Firebase service account key (not committed)


