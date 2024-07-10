import express from "express";
import {
  create,
  getPosts,
  getPostBySlug,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/", getPosts);
router.get("/:slug", getPostBySlug); // Separate route for fetching a single post by slug
router.delete("/:postId/:userId", verifyToken, deletePost);
router.put("/:postId/:userId", verifyToken, updatePost);

export default router;
