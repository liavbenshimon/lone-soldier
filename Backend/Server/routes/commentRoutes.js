import express from "express";
import {
  getCommentsByPostId,
  createComment,
} from "../controllers/commentController.js";

const router = express.Router();

// GET /comments/post/:postId - Get all comments for a specific post
router.get("/post/:postId", getCommentsByPostId);

// POST /comments - Add a new comment to a post
router.post("/", createComment);

export default router;
