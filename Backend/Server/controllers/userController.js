import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import SignupRequest from "../models/signupRequestModel.js";

dotenv.config();

// Helper function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "23h",
  });
};

// התחברות למשתמש
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // First try to login as regular user
    const user = await User.findOne({ email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // Create token for regular user
        const token = createToken(user._id);
        res.status(200).json({
          user,
          token,
          type: "user",
        });
        return;
      }
    }

    // If no user found or password didn't match, check signup requests
    const signupRequest = await SignupRequest.findOne({ email });
    if (signupRequest) {
      const match = await bcrypt.compare(password, signupRequest.password);
      if (match) {
        // Create a special token for pending signup
        const token = createToken(signupRequest._id);
        res.status(200).json({
          request: signupRequest,
          token,
          type: "pending",
        });
        return;
      }
    }

    res.status(401).json({ error: "Invalid login credentials" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// יצירת משתמש חדש
export const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      passport,
      email,
      password,
      phone,
      personalIdentificationNumber,
      media,
      type,
      authorId,
    } = req.body;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ודא שהשדה type הוא אחד משני הערכים המוגדרים
    if (!["Contributer", "Soldier"].includes(type)) {
      return res.status(400).json({
        message: 'Invalid type. Type must be "Contributer" or "Soldier".',
      });
    }

    // יצירת משתמש חדש
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
      // authorId,  // מזהה של המשתמש היוצר
    });

    const temp = await newUser.save();

    // יצירת טוקן JWT
    const token = jwt.sign({ id: temp._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "23h",
    });

    // שלח את התגובה עם המידע על המשתמש ועם הטוקן
    res.status(201).json({
      message: "User created successfully",
      token: token,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error creating user ${error}` });
  }
};

// קבלת משתמש לפי שם מלא (firstName, lastName)
export const getUserByFullName = async (req, res) => {
  try {
    const { firstName, lastName } = req.params;

    const user = await User.findOne({ firstName, lastName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

// קבלת כל המשתמשים
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // שולח תשובה אחת בלבד
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      // בודק אם כבר נשלחה תגובה
      res.status(500).json({ message: "Error fetching users" });
    }
  }
};

// מחיקת משתמש לפי דרכון (passport)
export const deleteUser = async (req, res) => {
  try {
    const { passport } = req.params;

    const user = await User.findOneAndDelete({ passport });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

// עדכון פרטי משתמש לפי דרכון (passport)
export const editUser = async (req, res) => {
  try {
    const { passport } = req.params;
    const {
      firstName,
      lastName,
      email,
      phone,
      personalIdentificationNumber,
      media,
      type,
      authorId,
    } = req.body;

    const user = await User.findOne({ passport });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // עדכון שדות המשתמש
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.personalIdentificationNumber =
      personalIdentificationNumber || user.personalIdentificationNumber;
    user.media = media || user.media;

    // עדכון שדות חדשים
    if (type) user.type = type;
    if (authorId) user.authorId = authorId;

    // שמור את המשתמש המעודכן
    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

// קבלת משתמש לפי מספר זיהוי אישי (personalIdentificationNumber)
export const getUserByPIN = async (req, res) => {
  try {
    const { personalIdentificationNumber } = req.params;

    const user = await User.findOne({ personalIdentificationNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user by PIN" });
  }
};
