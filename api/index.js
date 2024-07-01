const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/user.route.js");
const authRoutes = require("./routes/auth.route.js");
const postRoutes = require("./routes/post.route.js");
const commentRoutes = require("./routes/comment.route.js");
const timelineRoutes = require("./routes/timeline.route.js");
const contactRoute = require("./routes/contact.route.js");
const projectRoutes = require("./routes/project.route.js");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }

  const __dirname = path.resolve();
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());

  app.use("/api/user", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/timeline", timelineRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/comment", commentRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/contact", contactRoute);

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

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};

startServer();
