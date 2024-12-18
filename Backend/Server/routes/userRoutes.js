// routes/userRoutes.js
import express from 'express';
import { createUser, getUserByFullName, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// Create a new user
router.post('/user', createUser);

// Get a user by passport number
router.get('/user/:passport', getUserByFullName);

// Get all users
router.get('/users', getAllUsers);

export default router;
