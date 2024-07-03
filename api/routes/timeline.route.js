// api/routes/timeline.route.js
import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
} from "../controllers/timeline.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createEvent);
router.put("/:id", verifyToken, updateEvent);
router.delete("/:id", verifyToken, deleteEvent);
router.get("/", getEvents);

export default router;
