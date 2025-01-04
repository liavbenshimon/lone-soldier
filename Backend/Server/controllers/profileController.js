import User from "../models/userModel.js";

// Get user profile by ID
export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { nickname, email, phone, bio, profileImage, receiveNotifications } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { nickname, email, phone, bio, profileImage, receiveNotifications },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
