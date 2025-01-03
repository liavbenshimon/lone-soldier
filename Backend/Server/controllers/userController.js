import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// התחברות למשתמש
// Buscar usuário pelo ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Obtenha o ID dos parâmetros da rota
    const user = await User.findById(id); // Use o método findById do Mongoose

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Envie os dados do usuário encontrados
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Error fetching user by ID" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // חפש את המשתמש לפי המייל
    const user = await User.findOne({ email });

    // אם המשתמש לא נמצא
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // בדוק אם הסיסמא שהוזנה תואמת את הסיסמא המאוחסנת
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // יצירת טוקן JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "23h",
    });

    // שלח את התגובה עם הטוקן
    res.status(200).json({
      message: "Login successful",
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
    res.status(500).json({ message: "Error logging in", error: error.message });
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
// export const editUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       firstName,
//       lastName,
//       email,
//       phone,
//       personalIdentificationNumber,
//       media,
//       type,
//       authorId,
//     } = req.body;

//     const user = await User.findOne({ _id:id });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // עדכון שדות המשתמש
//     user.firstName = firstName || user.firstName;
//     user.lastName = lastName || user.lastName;
//     user.email = email || user.email;
//     user.phone = phone || user.phone;
//     user.personalIdentificationNumber =
//       personalIdentificationNumber || user.personalIdentificationNumber;
//     user.media = media || user.media;

//     // שמור את המשתמש המעודכן
//     await user.save();

//     res.status(200).json({
//       message: "User updated successfully",
//       user: user,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error updating user" });
//   }
//};
// export const editUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const updatedData = req.body;

//     const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
//       new: true,
//     });

//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update user" });
//   }
// };

export const editUser = async (req, res) => {
  try {
    const { id } = req.params; // Obtenha o ID do usuário
    const updatedData = req.body; // Dados enviados pelo frontend

    // Atualize todos os campos fornecidos
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updatedData,
      { new: true } // Retorne o documento atualizado
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser); // Retorne o usuário atualizado
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error });
  }
};
;



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
