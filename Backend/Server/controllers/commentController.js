import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// Get all comments for a specific post
export const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).populate(
      "authorId",
      "username"
    );
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: error.message });
  }
};

// Add a new comment to a post
import mongoose from "mongoose";

export const createComment = async (req, res) => {
  const { postId, text, authorId } = req.body;

  // Validate required fields
  if (!postId || !text || !authorId) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  // Validate IDs
  if (
    !mongoose.Types.ObjectId.isValid(authorId) ||
    !mongoose.Types.ObjectId.isValid(postId)
  ) {
    return res.status(400).json({ message: "Invalid ID format." });
  }

  try {
    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the user exists
    const user = await User.findById(authorId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create and save the comment
    let comment = new Comment({ postId, text, authorId });
    await comment.save();

    // Populate username
    comment = await comment.populate("authorId", "username");

    // Add comment reference to the post
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: error.message });
  }
};
