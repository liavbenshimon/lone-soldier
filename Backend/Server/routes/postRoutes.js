import express from "express";
import {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  togglePostLike,
  getLikedUsers,
} from "../controllers/postController.js";
import { authenticateToken } from "../middleware/authMiddleware.js"; // Import the middleware

const router = express.Router();

// GET /posts - Get all posts (public)
router.get("/", getPosts);

// POST /posts - Create a new post (protected)
router.post("/", authenticateToken, createPost);

// GET /posts/:postId - Get a specific post by its ID (public)
router.get("/:postId", getPostById);

// PUT /posts/:postId - Update a post by its ID (protected)
router.put("/:postId", authenticateToken, updatePost);

// DELETE /posts/:postId - Delete a post by its ID (protected)
router.delete("/:postId", authenticateToken, deletePost);

router.patch("/:postId/toggle-like", togglePostLike);

router.get("/:postId/likes", getLikedUsers);

export default router;
