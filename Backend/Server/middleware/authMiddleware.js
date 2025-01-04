import jwt from "jsonwebtoken";

/**
 * Middleware to authenticate requests using JWT.
 * It verifies the token and attaches the user ID (`_id`) to the request object.
 */


// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers.authorization; 
//   const token = authHeader && authHeader.split(" ")[1]; 

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = { _id: decoded.id }; 
//     console.log("User ID:", req.user, decoded); 
//     next(); 
//   } catch (error) {
//     console.error("Token verification failed:", error.message); 
//     res.status(403).json({ message: "Invalid or expired token." });
//   }
// };

// export default authenticateToken;


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach user ID to the request object for further use

    req.user = { _id: decoded.id }; //WHY WAS THIS _ID? if decoded has only id?!?

    next(); // Proceed to the next middleware or route handler

  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default authenticateToken;

