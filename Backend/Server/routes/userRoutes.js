// routes/userRoutes.js
import express from 'express';
import { createUser, loginUser, getUserByFullName, getAllUsers, deleteUser, editUser } from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js'; // Import authentication middleware

const router = express.Router();

// Routes for user management
router.post('/login', loginUser); // User login and JWT generation
router.post('/', createUser); // Create a new user
router.get('/:firstName/:lastName', authenticateToken, getUserByFullName); // Get user by full name
router.get('/', authenticateToken, getAllUsers); // Get all users
router.delete('/:passport', authenticateToken, deleteUser); // Delete a user by passport
router.put('/:passport', authenticateToken, editUser); // Edit a user by passport

export default router;
