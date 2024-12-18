import Donation from '../models/donationModel.js';


export const createDonation = async (req, res) => {
  try {
    const { location, zone, category, ownerPhone, description, media, authorId } = req.body;

    // Create a new Donation document
    const newDonation = new Donation({
      location,
      zone,
      category,
      ownerPhone,
      description,
      media,
      authorId,
    });

    // Save the new donation to the database
    await newDonation.save();

    return res.status(201).json({
      message: 'Donation created successfully',
      donation: newDonation,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating donation',
      error: error.message,
    });
  }
};

// Get all donations
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    return res.status(200).json(donations);
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving donations',
      error: error.message,
    });
  }
};

// Get a donation by ID
export const getDonationById = async (req, res) => {
  const { id } = req.params;

  try {
    const donation = await Donation.findById(id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    return res.status(200).json(donation);
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving donation',
      error: error.message,
    });
  }
};

// Update a donation by ID
export const updateDonationById = async (req, res) => {
  const { id } = req.params;
  const { location, zone, category, ownerPhone, description, media } = req.body;

  try {
    const updatedDonation = await Donation.findByIdAndUpdate(
      id,
      {
        location,
        zone,
        category,
        ownerPhone,
        description,
        media,
      },
      { new: true } // Return the updated document
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    return res.status(200).json({
      message: 'Donation updated successfully',
      donation: updatedDonation,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating donation',
      error: error.message,
    });
  }
};

// Delete a donation by ID
export const deleteDonationById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDonation = await Donation.findByIdAndDelete(id);

    if (!deletedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    return res.status(200).json({
      message: 'Donation deleted successfully',
      donation: deletedDonation,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting donation',
      error: error.message,
    });
  }
};
