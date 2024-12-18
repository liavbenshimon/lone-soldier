import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const saltRounds = 10;

// יצירת משתמש חדש (Signup)
export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// כניסת משתמש קיים (Login)
export const login = async (req, res) => {
  console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET_KEY) {
      throw new Error(
        "JWT_SECRET_KEY is not defined in the environment variables"
      );
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Logged in successfully", token, user });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// מציאת משתמש לפי displayName
export const getUserByDisplayName = async (req, res) => {
  const { displayName } = req.params;

  try {
    const user = await User.findOne({ username: displayName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// פונקציה לחיפוש משתמשים לפי שם משתמש
export const searchUsersByUsername = async (req, res) => {
  try {
    const { username } = req.query; // קבלת הפרמטר
    if (!username) {
      return res
        .status(400)
        .json({ message: "Username query parameter is required." });
    }

    // חיפוש משתמשים לפי username (case-insensitive)
    const users = await User.find({
      username: { $regex: username, $options: "i" },
    }).select("_id username email");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error.message);
    res
      .status(500)
      .json({ message: "Server error while searching for users." });
  }
};

// הצגת כל המשתמשים
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// קבלת פרופיל המשתמש (מוגן עם טוקן)
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user profile." });
  }
};

export const getUserProfileByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.find({ authorId: user._id }).populate(
      "authorId",
      "username email"
    );

    res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchUsers = async (req, res) => {
  const { query } = req.query; // אחזור הפרמטר query מהבקשה

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const users = await User.find({
      username: { $regex: query, $options: "i" },
    }); // חיפוש מבוסס regex
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
