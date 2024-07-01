const express = require("express");
const { verifyToken } = require("../utils/verifyUser.js");
const {
  create,
  deletePost,
  getPosts,
  updatePost,
} = require("../controllers/post.controller.js");
const Post = require("../models/post.model.js");

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

module.exports = router;
