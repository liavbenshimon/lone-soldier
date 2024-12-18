// routes/userRoutes.js
import express from 'express';
import { createUser, getUserByFullName, getAllUsers, deleteUser, editUser } from '../controllers/userController.js';

const router = express.Router();

// Routes for user management
router.post('/', createUser); // Create a new user
router.get('/:firstName/:lastName', getUserByFullName); // Get user by full name
router.get('/', getAllUsers); // Get all users
router.delete('/:passport', deleteUser); // Delete a user by passport
router.put('/:passport', editUser); // Edit a user by passport

export default router;
