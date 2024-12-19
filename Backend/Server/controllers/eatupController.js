import EatUp from "../models/eatupModel.js";

// יצירת רשומת EatUp חדשה
export const createEatUp = async (req, res) => {
  try {
    const {
      zone,
      title,
      media,
      owner,
      date,
      kosher,
      description,
      language,
      hosting,
      religios,
      authorId,
    } = req.body;

    // יצירת אובייקט חדש של הסכמה
    const newEatUp = new EatUp({
      zone,
      title,
      media: media || [], // הגדרת ברירת מחדל במקרה שלא נשלחה מדיה
      owner,
      date,
      kosher,
      description,
      language,
      hosting,
      religios,
      authorId,
    });

    // שמירת הרשומה במסד הנתונים
    await newEatUp.save();

    res.status(201).json({ message: "EatUp entry created successfully", data: newEatUp });
  } catch (error) {
    res.status(500).json({ message: "Error creating EatUp entry", error: error.message });
  }
};

// קבלת כל רשומות ה-EatUp
export const getAllEatUps = async (req, res) => {
  try {
    const eatups = await EatUp.find().populate("authorId", "name email"); // תצוגת שדות נבחרים של authorId
    res.status(200).json({ message: "EatUp entries retrieved successfully", data: eatups });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving EatUp entries", error: error.message });
  }
};

// קבלת רשומת EatUp ספציפית לפי ID
export const getEatUpById = async (req, res) => {
  const { id } = req.params;
  try {
    const eatup = await EatUp.findById(id).populate("authorId", "name email");

    if (!eatup) {
      return res.status(404).json({ message: "EatUp entry not found" });
    }

    res.status(200).json({ message: "EatUp entry found", data: eatup });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving EatUp entry", error: error.message });
  }
};

// עדכון רשומת EatUp לפי ID
export const updateEatUp = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedEatUp = await EatUp.findByIdAndUpdate(id, updatedData, { new: true }).populate("authorId", "name email");

    if (!updatedEatUp) {
      return res.status(404).json({ message: "EatUp entry not found" });
    }

    res.status(200).json({ message: "EatUp entry updated successfully", data: updatedEatUp });
  } catch (error) {
    res.status(500).json({ message: "Error updating EatUp entry", error: error.message });
  }
};

// מחיקת רשומת EatUp לפי ID
export const deleteEatUp = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEatUp = await EatUp.findByIdAndDelete(id);

    if (!deletedEatUp) {
      return res.status(404).json({ message: "EatUp entry not found" });
    }

    res.status(200).json({ message: "EatUp entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting EatUp entry", error: error.message });
  }
};
