import Donation from "../models/donationModel.js";

// Create a new donation
export const createDonation = async (req, res) => {
  try {
    const donationData = { ...req.body, authorId: req.user._id };
    const newDonation = new Donation(donationData);
    await newDonation.save();

    return res.status(201).json({
      message: "Donation created successfully",
      donation: newDonation,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating donation",
      error: error.message,
    });
  }
};

// Get all donations
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate(
      "authorId",
      "firstName lastName"
    );
    return res.status(200).json(donations);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving donations",
      error: error.message,
    });
  }
};

// Get a donation by ID
export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate(
      "authorId",
      "firstName lastName"
    );

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    return res.status(200).json(donation);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving donation",
      error: error.message,
    });
  }
};

// Update a donation by ID
export const updateDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // Check ownership unless user is admin
    if (
      req.user.type !== "Admin" &&
      donation.authorId.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this donation" });
    }

    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      message: "Donation updated successfully",
      donation: updatedDonation,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating donation",
      error: error.message,
    });
  }
};

// Delete a donation by ID
export const deleteDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // Check ownership unless user is admin
    if (
      req.user.type !== "Admin" &&
      donation.authorId.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this donation" });
    }

    await donation.deleteOne();
    return res.status(200).json({
      message: "Donation deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting donation",
      error: error.message,
    });
  }
};
