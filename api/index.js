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
import fetch from "node-fetch";

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

  const allowedOrigins = [
    "https://preston-devfolio.netlify.app",
    "http://localhost:5173",
    "https://test-devfolio.netlify.app",
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
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
  console.log("CORS policy set with allowed origins:", allowedOrigins);

  app.use(express.json());
  console.log("Express JSON middleware added");

  app.use(cookieParser());
  console.log("Cookie parser middleware added");

  app.use((req, res, next) => {
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });
  console.log("Custom headers set for Cross-Origin policies");

  app.use("/api/user", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/timeline", timelineRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/comment", commentRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/contact", contactRoute);
  console.log("API routes added");

  app.use(express.static(path.join(__dirname, "/client/dist")));
  console.log(
    "Serving static files from:",
    path.join(__dirname, "/client/dist")
  );

  app.get("*", (req, res) => {
    console.log("Serving index.html for:", req.originalUrl);
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });

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
  console.log("Error handling middleware added");

  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });

  // Add GitLab insights route
 app.get("/api/gitlab-insights", async (req, res) => {
   try {
     const token = process.env.GITLAB_TOKEN;
     console.log("Using GitLab token:", token); // Log token (ensure this is not done in production for security)

     const response = await fetch("https://gitlab.com/api/v4/users/24304", {
       headers: {
         "Private-Token": token,
       },
     });

     if (!response.ok) {
       const errorText = await response.text();
       console.error(
         `GitLab API error: ${response.status} ${response.statusText} - ${errorText}`
       );
       throw new Error(`Network response was not ok: ${response.statusText}`);
     }

     const data = await response.json();
     res.json(data);
   } catch (error) {
     console.error("Error fetching GitLab insights:", error.message);
     res.status(500).json({ error: error.message });
   }
 });

};

startServer();
