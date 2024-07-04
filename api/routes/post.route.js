import express from "express";
import {
  create,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/", getPosts);
router.get("/:slug", getPosts);
router.delete("/:postId/:userId", verifyToken, deletePost);
router.put("/:postId/:userId", verifyToken, updatePost);

export default router;
