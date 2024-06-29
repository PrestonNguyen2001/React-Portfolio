
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import timelineRoutes from "./routes/timeline.route.js";
import projectRoutes from "./routes/project.route.js";
import cookieParser from "cookie-parser";
import path from "path";

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
