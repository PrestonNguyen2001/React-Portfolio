import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

const createToken = (user) => {
  try {
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("Generated token:", token); 
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};

const setCookie = (res, token) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      path: "/",
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    console.log("Cookie set:", res.get("Set-Cookie")); 
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log("Signup request body:", req.body);
  if (!username || !email || !password) {
    console.log("Signup validation failed: missing fields");
    return next(errorHandler(400, "All fields are required!"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  console.log("Hashed password:", hashedPassword);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    console.log("New user saved:", newUser);

    const token = createToken(newUser);
    setCookie(res, token);
    res
      .status(201)
      .json({ message: "Signup successful", user: newUser, token });
  } catch (error) {
    console.error("Error during signup:", error);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("Signin request body:", req.body);

  if (!email || !password) {
    console.log("Signin validation failed: missing fields");
    return next(errorHandler(400, "All fields are required!"));
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    console.log("User found for signin:", user);

    if (!user) {
      console.log("User not found during signin");
      return next(errorHandler(404, "User Not Found!"));
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    console.log("Password validation result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid password during signin");
      return next(errorHandler(400, "Invalid Password!"));
    }

    const token = createToken(user);
    const { password: userPassword, ...rest } = user.toObject();
    setCookie(res, token);
    res.status(200).json({ ...rest, token });
  } catch (error) {
    console.error("Error during signin:", error);
    next(errorHandler(500, "Internal Server Error"));
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  console.log("Google signin request body:", req.body);

  try {
    let user = await User.findOne({ email });
    console.log("User found for Google signin:", user);

    if (user) {
      const token = createToken(user);
      const { password, ...rest } = user._doc;
      setCookie(res, token);
      res.status(200).json({ ...rest, token });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      console.log("Generated password for new Google user:", generatedPassword);
      console.log("Hashed password for new Google user:", hashedPassword);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();
      console.log("New Google user saved:", newUser);

      const token = createToken(newUser);
      const { password, ...rest } = newUser._doc;
      setCookie(res, token);
      res.status(200).json({ ...rest, token });
    }
  } catch (error) {
    console.error("Error during Google signin:", error);
    next(error);
  }
};
