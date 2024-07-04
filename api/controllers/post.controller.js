import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  console.log("Create post request data:", req.body);
  if (!req.user || !req.user.isAdmin) {
    console.log("User not allowed to create post:", req.user);
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    console.log("Missing required fields:", req.body);
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    console.log("Saving new post:", newPost);
    const savedPost = await newPost.save();
    console.log("Post saved successfully:", savedPost);
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const { slug } = req.params;
    console.log("Fetching post with slug:", slug);

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    if (slug) {
      query.slug = slug;
      const post = await Post.findOne(query);
      if (!post) {
        console.log("Post not found with slug:", slug);
        return res.status(404).json({ message: "Post not found" });
      }
      console.log("Post found:", post);
      return res.status(200).json({ post });
    }

    console.log("Fetching posts with query:", query);
    const posts = await Post.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    console.log("Fetched posts:", posts);

    const totalPosts = await Post.countDocuments(query);

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    console.log(
      "Total posts:",
      totalPosts,
      "Posts last month:",
      lastMonthPosts
    );

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  console.log("Delete post request params:", req.params);
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    console.log("User not allowed to delete post:", req.user);
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  try {
    console.log("Deleting post with ID:", req.params.postId);
    await Post.findByIdAndDelete(req.params.postId);
    console.log("Post deleted successfully:", req.params.postId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    console.error("Error deleting post:", error);
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  console.log("Update post request data:", req.body);
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    console.log("User not allowed to update post:", req.user);
    return next(errorHandler(403, "You are not allowed to update this post"));
  }
  try {
    console.log("Updating post with ID:", req.params.postId);
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    console.log("Post updated successfully:", updatedPost);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    next(error);
  }
};
