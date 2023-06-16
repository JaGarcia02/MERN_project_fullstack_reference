import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  // --- check if cookie is existing --- //
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //   this userId from the decoded is from the payload in the generateToken
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token!");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token found!");
  }
});

export { protect };
