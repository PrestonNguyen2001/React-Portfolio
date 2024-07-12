import express from "express";
import {
  create,
  getPosts,
  getPostBySlug,
  getPostById,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/", getPosts);
router.get("/slug/:slug", getPostBySlug);
router.get("/:postId", getPostById);
router.delete("/:postId/:userId", verifyToken, deletePost);
router.put("/:postId/:userId", verifyToken, updatePost);

export default router;
