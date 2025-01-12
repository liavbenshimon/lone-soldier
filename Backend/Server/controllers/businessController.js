import Business from "../models/businessModel.js";

// Create a new business
export const createBusiness = async (req, res) => {
  try {
    const { name, owner, address, image, description } = req.body;

    // יצירת עסק חדש עם הנתונים מהבקשה
    const business = new Business({
      name,
      owner,
      address,
      image,
      description,
    });

    await business.save(); // שמירת המסמך
    res.status(201).json(business); // החזרת המסמך שנשמר
  } catch (error) {
    res.status(500).json({ message: error.message }); // טיפול בשגיאה
  }
};

// Get all businesses
export const getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find(); // שליפת כל העסקים
    res.status(200).json(businesses); // החזרת הרשימה
  } catch (error) {
    res.status(500).json({ message: error.message }); // טיפול בשגיאה
  }
};

// Get a single business by ID
export const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;
    const business = await Business.findById(id); // שליפת עסק לפי ID

    if (!business) {
      return res.status(404).json({ message: "Business not found" }); // אם לא נמצא
    }

    res.status(200).json(business); // החזרת העסק שנמצא
  } catch (error) {
    res.status(500).json({ message: error.message }); // טיפול בשגיאה
  }
};

// Update a business by ID
export const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, image, description } = req.body;

    const business = await Business.findByIdAndUpdate(
      id, // ID של העסק לעדכון
      { name, address, image, description }, // נתונים לעדכון
      { new: true } // מחזיר את המסמך המעודכן
    );

    if (!business) {
      return res.status(404).json({ message: "Business not found" }); // אם לא נמצא
    }

    res.status(200).json(business); // החזרת העסק המעודכן
  } catch (error) {
    res.status(500).json({ message: error.message }); // טיפול בשגיאה
  }
};

// Delete a business by ID
export const deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    const business = await Business.findByIdAndDelete(id); // מחיקת עסק לפי ID

    if (!business) {
      return res.status(404).json({ message: "Business not found" }); // אם לא נמצא
    }

    res.status(200).json({ message: "Business deleted successfully" }); // תגובה למחיקה מוצלחת
  } catch (error) {
    res.status(500).json({ message: error.message }); // טיפול בשגיאה
  }
};
