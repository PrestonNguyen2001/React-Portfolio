import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    console.log("Create comment request data:", { content, postId, userId });

    if (userId !== req.user.id) {
      console.log("User not allowed to create comment:", userId, req.user.id);
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    console.log("New comment data:", newComment);
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    console.log("Error creating comment:", error);
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    console.log("Fetching comments for post ID:", req.params.postId);
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    console.log("Fetched comments:", comments);
    res.status(200).json(comments);
  } catch (error) {
    console.log("Error fetching comments:", error);
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    console.log("Liking comment with ID:", req.params.commentId);
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      console.log("Comment not found:", req.params.commentId);
      return next(errorHandler(404, "Comment not found"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    console.log("Updated comment after like:", comment);
    res.status(200).json(comment);
  } catch (error) {
    console.log("Error liking comment:", error);
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    console.log("Editing comment with ID:", req.params.commentId);
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      console.log("Comment not found:", req.params.commentId);
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      console.log(
        "User not allowed to edit comment:",
        req.user.id,
        comment.userId
      );
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    console.log("Edited comment:", editedComment);
    res.status(200).json(editedComment);
  } catch (error) {
    console.log("Error editing comment:", error);
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    console.log("Deleting comment with ID:", req.params.commentId);
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      console.log("Comment not found:", req.params.commentId);
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      console.log(
        "User not allowed to delete comment:",
        req.user.id,
        comment.userId
      );
      return next(
        errorHandler(403, "You are not allowed to delete this comment")
      );
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    console.log("Comment deleted:", req.params.commentId);
    res.status(200).json("Comment has been deleted");
  } catch (error) {
    console.log("Error deleting comment:", error);
    next(error);
  }
};

export const getcomments = async (req, res, next) => {
  if (!req.user.isAdmin) {
    console.log("User not allowed to get all comments:", req.user.id);
    return next(errorHandler(403, "You are not allowed to get all comments"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    console.log("Fetching all comments with params:", {
      startIndex,
      limit,
      sortDirection,
    });

    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    console.log(
      "Fetched comments, total:",
      totalComments,
      "last month:",
      lastMonthComments
    );
    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    console.log("Error fetching comments:", error);
    next(error);
  }
};
