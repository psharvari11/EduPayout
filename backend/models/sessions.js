const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
    sessionType: { type: String, enum: ["live", "evaluation", "review"], required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true }, // in minutes
    ratePerHour: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
