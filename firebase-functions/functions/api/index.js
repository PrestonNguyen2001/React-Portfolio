const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const postRoutes = require("./routes/post.route");
const commentRoutes = require("./routes/comment.route");
const timelineRoutes = require("./routes/timeline.route");
const contactRoute = require("./routes/contact.route");
const projectRoutes = require("./routes/project.route");
const functions = require("firebase-functions");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true })); // Enable CORS for all origins

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoute);

// Serve static files
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
const startServer = async () => {
  try {
    await mongoose.connect(functions.config().mongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};

startServer();

module.exports = app;
