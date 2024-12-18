import Post from "../models/Post.js";
import User from "../models/User.js";

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("authorId", "username email")
      .populate({
        path: "comments",
        populate: { path: "authorId", select: "username" },
      });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    // Verify that the user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized. No user found." });
    }

    // Fetch the authenticated user from the database
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Create a new post with the authenticated user's ID as authorId
    const post = new Post({
      title,
      content,
      authorId: req.user._id, // Use `_id` from authenticated user
    });

    await post.save();
    res.status(201).json(post); // Return created post
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific post by its ID
export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId)
      .populate("authorId", "username email") // Populate author details
      .populate("comments") // Populate comments
      .exec();

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post); // Return post with comments and author details
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post by its ID
export const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Update the post fields
    post.title = title || post.title;
    post.content = content || post.content;

    await post.save(); // Save the updated post

    res.status(200).json(post); // Return updated post
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a post by its ID
export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Optionally: Check if the requesting user is the author
    if (post.authorId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId); // Delete the post
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the post" });
  }
};

// postController.js
export const togglePostLike = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (!post.likedBy) {
      post.likedBy = []; // Initialize if not present
    }

    const userIndex = post.likedBy.indexOf(userId);

    if (userIndex === -1) {
      // Add like
      post.likedBy.push(userId);
    } else {
      // Remove like
      post.likedBy.splice(userIndex, 1);
    }

    post.likes = post.likedBy.length; // Update the likes count
    await post.save();

    res.status(200).json({ likes: post.likes, likedBy: post.likedBy });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getLikedUsers = async (req, res) => {
  const { postId } = req.params;

  try {
    // Find the post and populate the likedBy field to get user details
    const post = await Post.findById(postId).populate(
      "likedBy",
      "username email"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post.likedBy); // Return the list of users who liked the post
  } catch (error) {
    console.error("Error fetching liked users:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching liked users" });
  }
};
