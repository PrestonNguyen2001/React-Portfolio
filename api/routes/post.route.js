import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";
import Post from "../models/post.model.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/", getPosts);
router.get("/:slug", async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ post });
  } catch (error) {
    next(error);
  }
});
router.delete("/:postId/:userId", verifyToken, deletePost);
router.put("/:postId/:userId", verifyToken, updatePost);

export default router;
