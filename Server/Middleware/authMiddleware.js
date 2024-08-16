import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import usersModel from "../models/usersModel.js";


// middleware function named 'protect'
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Attempt to retrieve the JWT token from the cookies
  token = req.cookies.jwt;

  // Check if the token exists
  if (token) {
    try {
      // Decode the token to extract the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID and attach the user object to the request, excluding the password
      req.user = await usersModel.findById(decoded.userId).select("-password");

      // Call the next middleware or route handler
      next();
    } catch (error) {
      // If there's an error in verifying the token, respond with an error message
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    // If no token is found, respond with an error message
    res.status(400);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
