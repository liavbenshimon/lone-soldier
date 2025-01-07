import Residence from "../models/residenceModel.js";

// Get all residences
export const getAllResidences = async (req, res) => {
  try {
    const residences = await Residence.find().populate(
      "authorId",
      "firstName lastName"
    );
    res.status(200).json(residences);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching residences", error: error.message });
  }
};

// Get residence by ID
export const getResidenceById = async (req, res) => {
  try {
    const residence = await Residence.findById(req.params.id).populate(
      "authorId",
      "firstName lastName"
    );
    if (!residence) {
      return res.status(404).json({ message: "Residence not found" });
    }
    res.status(200).json(residence);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching residence", error: error.message });
  }
};

// Create new residence
export const createResidence = async (req, res) => {
  try {
    const residenceData = { ...req.body, authorId: req.user._id };

    // Validate required fields
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
    ];

    for (const field of requiredFields) {
      if (residenceData[field] === undefined || residenceData[field] === null) {
        return res
          .status(400)
          .json({ message: `Missing required field: ${field}` });
      }
    }

    const newResidence = new Residence(residenceData);
    await newResidence.save();

    res.status(201).json(newResidence);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating residence", error: error.message });
  }
};

// Update residence
export const updateResidence = async (req, res) => {
  try {
    const residence = await Residence.findById(req.params.id);
    if (!residence) {
      return res.status(404).json({ message: "Residence not found" });
    }

    // Check ownership unless user is admin
    if (
      req.user.type !== "Admin" &&
      residence.authorId.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this residence" });
    }

    const updatedResidence = await Residence.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedResidence);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating residence", error: error.message });
  }
};

// Delete residence
export const deleteResidence = async (req, res) => {
  try {
    const residence = await Residence.findById(req.params.id);
    if (!residence) {
      return res.status(404).json({ message: "Residence not found" });
    }

    // Check ownership unless user is admin
    if (
      req.user.type !== "Admin" &&
      residence.authorId.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this residence" });
    }

    await residence.deleteOne();
    res.status(200).json({ message: "Residence deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting residence", error: error.message });
  }
};
