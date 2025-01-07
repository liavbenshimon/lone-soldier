import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  likePost,
  addComment,
} from "../controllers/postController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, createPost);
router.get("/", authenticateToken, getAllPosts); 
router.get("/:id", authenticateToken, getPostById); 
router.put("/:id/like", authenticateToken, likePost); 
router.post("/:id/comment", authenticateToken, addComment); 

export default router;
