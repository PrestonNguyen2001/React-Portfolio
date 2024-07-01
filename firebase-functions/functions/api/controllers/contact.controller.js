const Contact = require("../models/contact.model.js");
const { errorHandler } = require("../utils/error.js");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const createContact = async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  // Save contact info to the database
  const newContact = new Contact({ name, email, message });

  try {
    await newContact.save();

    // Send email notification
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

module.exports = {
  createContact,
};
