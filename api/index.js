import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import timelineRoutes from "./routes/timeline.route.js";
import contactRoute from "./routes/contact.route.js";
import projectRoutes from "./routes/project.route.js";
import path from "path";

dotenv.config();

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
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

  // Configure CORS
  const allowedOrigins = [
    "https://preston-devfolio.netlify.app",
    "http://localhost:5173",
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
          console.warn(msg);
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(cookieParser());

  // Add security headers
  app.use((req, res, next) => {
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });

  app.use("/api/user", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/timeline", timelineRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/comment", commentRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/contact", contactRoute);

  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    console.log("Serving index.html for:", req.originalUrl);
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error("Error stack:", err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Error status code:", statusCode, "Message:", message);
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
