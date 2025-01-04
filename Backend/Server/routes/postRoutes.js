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

router.post("/", authenticateToken, createPost); // Criar um post
router.get("/", authenticateToken, getAllPosts); // Obter todos os posts
router.get("/:id", authenticateToken, getPostById); // Obter um post específico
router.put("/:id/like", authenticateToken, likePost); // Curtir um post
router.post("/:id/comment", authenticateToken, addComment); // Adicionar um comentário

export default router;
