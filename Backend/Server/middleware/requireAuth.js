import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import SignupRequest from "../models/signupRequestModel.js";

export const requireAuth = async (req, res, next) => {
  // Verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    // Verify token
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // First try to find a user
    let user = await User.findById(id);

    if (user) {
      req.user = user;
      next();
      return;
    }

    // If no user found, check for signup request
    const signupRequest = await SignupRequest.findById(id);
    if (signupRequest) {
      // Only allow access to own signup request data
      if (req.method === "GET" && req.path === `/signup-requests/${id}`) {
        req.user = signupRequest;
        next();
        return;
      }
    }

    // No valid user or request found
    res.status(401).json({ error: "Request is not authorized" });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};
