// api/routes/project.route.js

import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createProject);
router.get("/", getProjects);
router.delete("/:projectId/:userId", verifyToken, deleteProject);
router.put("/:projectId/:userId", verifyToken, updateProject);

export default router;
