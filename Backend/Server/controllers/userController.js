// controllers/userController.js
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, passport, email, password, phone, personalIdentificationNumber, media } = req.body;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      passport,
      email,
      password: hashedPassword,
      phone,
      personalIdentificationNumber,
      media,
    });

    await newUser.save();
    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Get a user by full name (firstName and lastName)
export const getUserByFullName = async (req, res) => {
  try {
    const { firstName, lastName } = req.params;

    const user = await User.findOne({ firstName, lastName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};
