import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Verify JWT token and attach user to request
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Role-based middleware that considers admin as having all permissions
const createRoleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    // Admin can do anything
    if (req.user.type === "Admin") {
      return next();
    }
    // Check if user has one of the allowed roles
    if (!allowedRoles.includes(req.user.type)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

// Admin middleware
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }
  if (req.user.type !== "Admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

// Role-based middleware functions
export const isSoldier = createRoleMiddleware(["Soldier"]);
export const isMunicipality = createRoleMiddleware(["Municipality"]);
export const isDonor = createRoleMiddleware(["Donor"]);
export const isOrganization = createRoleMiddleware(["Organization"]);
export const isBusiness = createRoleMiddleware(["Business"]);

// Combined role middleware for shared features
export const canCreateEatups = createRoleMiddleware([
  "Municipality",
  "Donor",
  "Organization",
]);
export const canAccessSocial = createRoleMiddleware([
  "Soldier",
  "Municipality",
  "Organization",
]);
export const canHandleRequestForm = createRoleMiddleware([
  "Soldier",
  "Municipality",
  "Donor",
]);

// Helper function to create JWT token with user type
export const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      type: user.type,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "23h" }
  );
};
