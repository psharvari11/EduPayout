const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "mentor" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mentor", mentorSchema);
