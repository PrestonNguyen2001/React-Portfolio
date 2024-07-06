import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  console.log("Test endpoint hit");
  res.json({ message: "API is working!" });
};

export const updateUser = async (req, res, next) => {
  console.log("Update user request:", req.params.userId, req.body);

  if (req.user.id !== req.params.userId) {
    console.log("Unauthorized update attempt by user:", req.user.id);
    return next(errorHandler(403, "Unauthorized"));
  }

  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
    console.log("Password hashed for user update:", req.body.password);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    );
    console.log("User successfully updated:", updatedUser);

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  console.log("Delete user request:", req.params.userId, req.user.id);

  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    console.log("Unauthorized delete attempt by user:", req.user.id);
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    console.log("User successfully deleted:", req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    console.error("Error deleting user:", error);
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
    console.log("User signed out and cookie cleared");
  } catch (error) {
    console.error("Error signing out user:", error);
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  console.log("Fetching all users");

  if (!req.user || !req.user.isAdmin) {
    console.log(
      "Unauthorized user list access attempt:",
      req.user ? req.user.id : "No user"
    );
    return next(errorHandler(403, "You are not allowed to see all users"));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    console.log(
      "Query parameters - startIndex:",
      startIndex,
      "limit:",
      limit,
      "sort:",
      sortDirection
    );

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    console.log("Users fetched:", users);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    console.log("Users without password:", usersWithoutPassword);

    const totalUsers = await User.countDocuments();
    console.log("Total users count:", totalUsers);

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    console.log("One month ago date:", oneMonthAgo);

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    console.log("Users registered last month:", lastMonthUsers);

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  console.log("Fetching user by ID:", req.params.userId);

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      console.log("User not found:", req.params.userId);
      return next(errorHandler(404, "User not found"));
    }
    console.log("User fetched:", user);

    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.error("Error fetching user:", error);
    next(error);
  }
};
