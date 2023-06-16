const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
const User = require("../models/user_models");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from Bearer
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      if (!token) {
        return res
          .status(401)
          .json({ message: "Not authorized, token invalid!" });
        // throw new Error("Not authorized, token invalid!");
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Not authorized" });
      // res.status(500);
      // throw new Error(error);
    }
  }
};

module.exports = { protect };
