import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

const createToken = (user) => {
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Token expiry set to 1 hour for better security
  );
  console.log("Generated token:", token); // Log token for debugging
  return token;
};

const setCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === "production";
  console.log("Setting token:", token); // Log token for debugging
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: isProduction, // Ensure this is true in production
    sameSite: isProduction ? "None" : "Lax",
  });
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    console.log("Missing fields in signup request:", req.body);
    return next(errorHandler(400, "All fields are required!"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    console.log("Creating new user:", newUser);
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    console.log("Error during signup:", error);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Missing email or password:", req.body);
    return next(errorHandler(400, "All fields are required!"));
  }

  try {
    const validUser = await User.findOne({ email }).lean(); // Use lean for a plain JavaScript object
    if (!validUser) {
      console.log("User not found:", email);
      return next(errorHandler(404, "User Not Found!"));
    }

    console.log("User found:", validUser);

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      console.log("Invalid password for user:", email);
      return next(errorHandler(400, "Invalid Password!"));
    }

    console.log("Password is valid for user:", email);

    const token = createToken(validUser);
    const { password, ...rest } = validUser;

    setCookie(res, token);
    res.status(200).json(rest);
  } catch (error) {
    console.log("Error during sign-in:", error);
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  console.log("Google sign-in request data:", { name, email, googlePhotoUrl });
  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log("User already exists:", user);
      const token = createToken(user);
      const { password, ...rest } = user._doc;

      setCookie(res, token);
      res.status(200).json(rest);
    } else {
      console.log("Creating new user from Google sign-in data.");
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      console.log("New user data:", newUser);
      await newUser.save();
      const token = createToken(newUser);
      const { password, ...rest } = newUser._doc;

      setCookie(res, token);
      res.status(200).json(rest);
    }
  } catch (error) {
    console.log("Error during Google sign-in:", error);
    next(error);
  }
};
