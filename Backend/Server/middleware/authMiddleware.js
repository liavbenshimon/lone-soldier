import jwt from "jsonwebtoken";

/**
 * Middleware to authenticate requests using JWT.
 * It verifies the token and attaches the user ID (`_id`) to the request object.
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the Authorization header
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token

  if (!token) {
    // If no token provided, return 401 Unauthorized
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach user ID to the request object for further use
    req.user = { _id: decoded._id };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed:", error.message); // Log the error
    res.status(403).json({ message: "Invalid or expired token." }); // Return 403 Forbidden
  }
};
