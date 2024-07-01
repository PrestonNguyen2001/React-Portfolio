const express = require("express");
const { createContact } = require("../controllers/contact.controller.js");

const router = express.Router();

router.post("/create", createContact);

module.exports = router;
