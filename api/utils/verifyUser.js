import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token from headers:", token);

  if (!token) {
    console.log("No token found");
    return next(errorHandler(401, "You are not authenticated"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Invalid token:", err.message);
      return next(errorHandler(403, "Token is not valid"));
    }
    console.log("Token verified, user:", user);
    req.user = user;
    next();
  });
};
