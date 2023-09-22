const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const errorHandler = require("./middleware/errorHandler");
const authenticate = require("./middleware/authenticate");

// Import route files
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/task_management_db";

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to Task Management API!");
});

// Public routes - No need for authentication on signup or login
app.use("/auth", authRoutes); // This include the signup route and other authentication routes

// Protected routes - accessible only to authenticated users
app.use("/tasks", authenticate, taskRoutes); // This include task-related routes
app.use("/notifications", authenticate, notificationRoutes); // This include notification-related routes

// Error handling middleware placed after the routes
app.use(errorHandler); // This catches errors from all routes

// MongoDB connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`MongoDB connection error: ${err}`);
  });
