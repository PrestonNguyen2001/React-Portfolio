const Project = require("../models/project.model.js");
const { errorHandler } = require("../utils/error.js");

const createProject = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a project"));
  }
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.imgPath ||
    !req.body.ghLink
  ) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const newProject = new Project({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this project")
    );
  }
  try {
    await Project.findByIdAndDelete(req.params.projectId);
    res.status(200).json("The project has been deleted");
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to update this project")
    );
  }
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
};
