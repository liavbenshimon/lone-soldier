import express from 'express';
import { createRequest, getRequests, getRequestById, deleteRequest, updateRequest, getApprovedRequests, getRequestByUserId } from '../controllers/requestController.js';
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();
//get
router.get('/approved', authenticateToken, getApprovedRequests);//Intended for use on the 'donors' page
router.get('/user', authenticateToken, getRequestByUserId);
router.get('/:id', authenticateToken, getRequestById);
router.get('/', authenticateToken, getRequests);
//post
router.post('/', authenticateToken, createRequest);
router.delete('/:id', authenticateToken, deleteRequest);
router.put('/:id', authenticateToken, updateRequest); 

export default router;
