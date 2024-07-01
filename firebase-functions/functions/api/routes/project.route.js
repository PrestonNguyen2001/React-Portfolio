const express = require("express");
const { verifyToken } = require("../utils/verifyUser.js");
const {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
} = require("../controllers/project.controller.js");

const router = express.Router();

router.post("/create", verifyToken, createProject);
router.get("/", getProjects);
router.delete("/:projectId/:userId", verifyToken, deleteProject);
router.put("/:projectId/:userId", verifyToken, updateProject);

module.exports = router;
