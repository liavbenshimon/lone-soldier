import Residence from "../models/residenceModel.js";

// קבלת כל הדירות
export const getAllResidences = async (req, res) => {
  try {
    const residences = await Residence.find();
    res.status(200).json(residences);
  } catch (error) {
    res.status(500).json({ message: "Error fetching residences", error });
  }
};

// קבלת דירה לפי מזהה
export const getResidenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const residence = await Residence.findById(id);
    if (!residence) {
      return res.status(404).json({ message: "Residence not found" });
    }
    res.status(200).json(residence);
  } catch (error) {
    res.status(500).json({ message: "Error fetching residence", error });
  }
};

// יצירת דירה חדשה
export const createResidence = async (req, res) => {
  try {
    const residenceData = req.body;

    // ווידוא שכל השדות הדרושים קיימים
    const requiredFields = [
      "enterDate",
      "location",
      "meter",
      "rooms",
      "zone",
      "price",
      "floor",
      "type",
      "owner",
      "phone",
      "propertyTax",
      "shalter",
      "storage",
      "balcony",
      "contractDuration",
      "authorId",
    ];
    for (const field of requiredFields) {
      if (residenceData[field] === undefined || residenceData[field] === null) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    // יצירת דירה חדשה והכנסתה למסד הנתונים
    const newResidence = new Residence(residenceData);
    await newResidence.save();

    res.status(201).json(newResidence);
  } catch (error) {
    res.status(400).json({ message: "Error creating residence", error });
  }
};

// עדכון דירה לפי מזהה
export const updateResidence = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedResidence = await Residence.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedResidence) {
      return res.status(404).json({ message: "Residence not found" });
    }
    res.status(200).json(updatedResidence);
  } catch (error) {
    res.status(400).json({ message: "Error updating residence", error });
  }
};

// מחיקת דירה לפי מזהה
export const deleteResidence = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResidence = await Residence.findByIdAndDelete(id);
    if (!deletedResidence) {
      return res.status(404).json({ message: "Residence not found" });
    }
    res.status(200).json({ message: "Residence deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting residence", error });
  }
};
