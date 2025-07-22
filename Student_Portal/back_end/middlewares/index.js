const jwt = require("jsonwebtoken");
const User = require("../models/users.models");
require("dotenv").config();


// check validation of token 

const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = async (req, res, next) => {
  
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized! No token provided." });
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user
    const userFound = await User.findById(decoded.userId).select("-password");

    if (!userFound) {
      return res.status(404).json({ message: "User not found." });
    }

    // Attach user to request
    req.user = userFound;

    // Proceed to next middleware
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};



module.exports = verifyToken