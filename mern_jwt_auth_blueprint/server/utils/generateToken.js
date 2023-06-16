import jwt from "jsonwebtoken";

// userId is the payload
// you can put any data in the payload, just match it to your data in the generateToken in the controllers
const generateToken = (res, userId, userName, userEmail) => {
  // the jwt.sign will sign these payload to the token that will be generated
  const token = jwt.sign(
    { userId, userName, userEmail },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
