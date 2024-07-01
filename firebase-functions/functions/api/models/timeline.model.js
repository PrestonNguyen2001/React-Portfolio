const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Timeline = mongoose.model("Timeline", timelineSchema);

module.exports = Timeline;
