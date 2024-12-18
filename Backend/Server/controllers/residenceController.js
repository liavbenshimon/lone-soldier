import Residence from "../models/residenceModel.js";

// Get all residences
export const getAllResidences = async (req, res) => {
  try {
    const residences = await Residence.find();
    res.status(200).json(residences);
  } catch (error) {
    res.status(500).json({ message: "Error fetching residences", error });
  }
};

// Get a residence by ID
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

// Create a new residence
export const createResidence = async (req, res) => {
  try {
    const residenceData = req.body;
    const newResidence = new Residence(residenceData);
    await newResidence.save();
    res.status(201).json(newResidence);
  } catch (error) {
    res.status(400).json({ message: "Error creating residence", error });
  }
};

// Update a residence by ID
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

// Delete a residence by ID
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

// Search residences by location
export const searchResidenceByLocation = async (req, res) => {
  try {
    const { location } = req.query; // Example: ?location=Tel Aviv
    const residences = await Residence.find({ location });
    if (residences.length === 0) {
      return res.status(404).json({ message: "No residences found for this location" });
    }
    res.status(200).json(residences);
  } catch (error) {
    res.status(500).json({ message: "Error searching residences", error });
  }
};

// Get residences by price range
export const getResidencesByPriceRange = async (req, res) => {
  try {
    const { min, max } = req.query; // Example: ?min=2000&max=4000
    const residences = await Residence.find({
      price: { $gte: Number(min), $lte: Number(max) },
    });
    res.status(200).json(residences);
  } catch (error) {
    res.status(500).json({ message: "Error fetching residences by price range", error });
  }
};
