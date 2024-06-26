const Timeline = require("../models/timeline.model.js");
const { errorHandler } = require("../utils/error.js");

const createEvent = async (req, res, next) => {
  try {
    const { date, icon, location, title, content } = req.body;

    const newEvent = new Timeline({
      date,
      icon,
      location,
      title,
      content,
    });
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating timeline event:", error);
    next(error);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const updatedEvent = await Timeline.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating timeline event:", error);
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    await Timeline.findByIdAndDelete(req.params.id);
    res.status(200).json("Timeline event has been deleted");
  } catch (error) {
    console.error("Error deleting timeline event:", error);
    next(error);
  }
};

const getEvents = async (req, res, next) => {
  try {
    const events = await Timeline.find();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching timeline events:", error);
    next(error);
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
};
