import Contact from "../models/contact.model.js";
import { errorHandler } from "../utils/error.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const createContact = async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  const newContact = new Contact({ name, email, message });

  try {
    await newContact.save();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return next(errorHandler(500, "Failed to send email"));
      }
      console.log("Email sent:", info.response);
      res.status(201).json({ message: "Contact form submitted successfully" });
    });
  } catch (error) {
    next(error);
  }
};
