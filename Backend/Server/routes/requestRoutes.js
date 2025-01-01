import express from 'express';
import { createRequest, getRequests, getRequestById, deleteRequest } from '../controllers/requestController.js';
import authenticateToken from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/', authenticateToken, createRequest);
router.get('/', authenticateToken, getRequests);
router.get('/:id', authenticateToken, getRequestById);
router.delete('/:id', authenticateToken, deleteRequest);



export default router;
