import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // חפש את המשתמש לפי המייל
    const user = await User.findOne({ email });

    // אם המשתמש לא נמצא
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // בדוק אם הסיסמא שהוזנה תואמת את הסיסמא המאוחסנת
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // יצירת טוקן JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '23h' });

    // שלח את התגובה עם הטוקן
     res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        type: user.type,
      },
    });
  } catch (error) {
     res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, passport, email, password, phone, personalIdentificationNumber, media, type } = req.body;

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
      type,
    }); 

    const temp = await newUser.save();
    const token = jwt.sign({ id: temp._id }, process.env.JWT_SECRET_KEY, { expiresIn: '23h' });
    res.status(201).json({
      message: 'User created successfully',
      token:token,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error creating user ${error}` });
  }
};


// Get user by full name (firstName and lastName)
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
    res.status(200).json(users); // שולח תשובה אחת בלבד
    console.log("sent 1");
    
  } catch (error) {
    console.error(error);
    if (!res.headersSent) { // בודק אם כבר נשלחה תגובה
      res.status(500).json({ message: 'Error fetching users' });
    }
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
