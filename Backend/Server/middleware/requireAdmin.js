import User from "../models/userModel.js";
//Add this middleware to the route that requires admin privileges
export const requireAdmin = async (req, res, next) => {
  try {
    // Check if user exists in request (set by requireAuth)
    if (!req.user?._id) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Find user and check if admin
    const user = await User.findById(req.user._id);
    if (!user || user.type !== "Admin") {
      return res
        .status(403)
        .json({ message: "This action requires admin privileges" });
    }

    // Store the full user object for later use
    req.user = user;

    // User is admin, proceed
    next();
  } catch (error) {
    console.error("Admin check error:", error);
    res.status(500).json({ message: "Server error during admin verification" });
  }
};
