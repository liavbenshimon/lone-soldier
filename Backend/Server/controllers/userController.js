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
    res.status(500).json({ message: `Error creating user ${error}` });
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

// Delete a user by passport (or any unique identifier)
export const deleteUser = async (req, res) => {
  try {
    const { passport } = req.params;

    const user = await User.findOneAndDelete({ passport });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

// Edit user details by passport (or any unique identifier)
export const editUser = async (req, res) => {
  try {
    const { passport } = req.params;
    const { firstName, lastName, email, phone, personalIdentificationNumber, media } = req.body;

    const user = await User.findOne({ passport });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.personalIdentificationNumber = personalIdentificationNumber || user.personalIdentificationNumber;
    user.media = media || user.media;

    // Save the updated user
    await user.save();
    res.status(200).json({
      message: 'User updated successfully',
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
};
