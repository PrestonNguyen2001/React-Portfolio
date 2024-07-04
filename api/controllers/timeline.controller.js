import Timeline from "../models/timeline.model.js";
import { errorHandler } from "../utils/error.js";

export const createEvent = async (req, res, next) => {
  try {
    const { date, icon, location, title, content } = req.body;
    console.log("Create event request data:", {
      date,
      icon,
      location,
      title,
      content,
    });

    const newEvent = new Timeline({
      date,
      icon,
      location,
      title,
      content,
    });
    console.log("New timeline event data:", newEvent);
    await newEvent.save();

    console.log("Timeline event created successfully:", newEvent);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating timeline event:", error);
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    console.log("Update event request data:", req.body);
    const updatedEvent = await Timeline.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    console.log("Timeline event updated successfully:", updatedEvent);
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating timeline event:", error);
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    console.log("Delete event request params:", req.params);
    await Timeline.findByIdAndDelete(req.params.id);
    console.log("Timeline event deleted successfully:", req.params.id);
    res.status(200).json("Timeline event has been deleted");
  } catch (error) {
    console.error("Error deleting timeline event:", error);
    next(error);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    console.log("Fetching all timeline events");
    const events = await Timeline.find();
    console.log("Fetched timeline events:", events);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching timeline events:", error);
    next(error);
  }
};
