import Project from "../models/project.model.js";
import { errorHandler } from "../utils/error.js";

export const createProject = async (req, res, next) => {
  console.log("Create project request data:", req.body);
  if (!req.user.isAdmin) {
    console.log("User not allowed to create project:", req.user);
    return next(errorHandler(403, "You are not allowed to create a project"));
  }
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.imgPath ||
    !req.body.ghLink
  ) {
    console.log("Missing required fields:", req.body);
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const newProject = new Project({
    ...req.body,
    userId: req.user.id,
  });
  try {
    console.log("Saving new project:", newProject);
    const savedProject = await newProject.save();
    console.log("Project saved successfully:", savedProject);
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error);
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    console.log("Fetching all projects");
    const projects = await Project.find();
    console.log("Fetched projects:", projects);
    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  console.log("Delete project request params:", req.params);
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    console.log("User not allowed to delete project:", req.user);
    return next(
      errorHandler(403, "You are not allowed to delete this project")
    );
  }
  try {
    console.log("Deleting project with ID:", req.params.projectId);
    await Project.findByIdAndDelete(req.params.projectId);
    console.log("Project deleted successfully:", req.params.projectId);
    res.status(200).json("The project has been deleted");
  } catch (error) {
    console.error("Error deleting project:", error);
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  console.log("Update project request data:", req.body);
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    console.log("User not allowed to update project:", req.user);
    return next(
      errorHandler(403, "You are not allowed to update this project")
    );
  }
  try {
    console.log("Updating project with ID:", req.params.projectId);
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log("Project updated successfully:", updatedProject);
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    next(error);
  }
};
