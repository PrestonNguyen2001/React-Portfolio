const express = require("express");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
} = require("../controllers/timeline.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();

router.post("/create", verifyToken, createEvent);
router.put("/:id", verifyToken, updateEvent);
router.delete("/:id", verifyToken, deleteEvent);
router.get("/", getEvents);

module.exports = router;
