import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({ message: "API is working!" });
};

export const updateUser = async (req, res, next) => {
  console.log("Update user request data:", req.body);
  if (req.user.id !== req.params.userId) {
    console.log("Unauthorized user update attempt:", req.user.id);
    return next(errorHandler(403, "Unauthorized"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      console.log("Password too short:", req.body.password.length);
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      console.log("Invalid username length:", req.body.username.length);
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      console.log("Username contains spaces:", req.body.username);
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      console.log("Username not lowercase:", req.body.username);
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      console.log("Username contains invalid characters:", req.body.username);
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }
  try {
    console.log("Updating user with ID:", req.params.userId);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    console.log("User updated successfully:", rest);
    res.status(200).json(rest);
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  console.log("Delete user request params:", req.params);
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    console.log("Unauthorized user delete attempt:", req.user.id);
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    console.log("Deleting user with ID:", req.params.userId);
    await User.findByIdAndDelete(req.params.userId);
    console.log("User deleted successfully:", req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    console.error("Error deleting user:", error);
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    console.log("Signing out user");
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    console.error("Error signing out user:", error);
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  console.log("Fetching all users");
  if (!req.user.isAdmin) {
    console.log("Unauthorized user list access attempt:", req.user.id);
    return next(errorHandler(403, "You are not allowed to see all users"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    console.log("Fetched users:", users);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    console.log(
      "Total users:",
      totalUsers,
      "Last month users:",
      lastMonthUsers
    );

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
  try {
    console.log("Fetching user with ID:", req.params.userId);
    const user = await User.findById(req.params.userId);
    if (!user) {
      console.log("User not found:", req.params.userId);
      return next(errorHandler(404, "User not found"));
    }
    const { password, ...rest } = user._doc;
    console.log("Fetched user:", rest);
    res.status(200).json(rest);
  } catch (error) {
    console.error("Error fetching user:", error);
    next(error);
  }
};
