import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // Sign the token with userId as the payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Save the token in a cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Only accessible by the server
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Only sent to the same site
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
