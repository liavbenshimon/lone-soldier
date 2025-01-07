import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  likePost,
  addComment,
} from "../controllers/postController.js";
import { verifyToken, canAccessSocial } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication and social access
router.use(verifyToken, canAccessSocial);

// Social feature routes
router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id/like", likePost);
router.post("/:id/comment", addComment);

export default router;
