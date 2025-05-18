const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "senderModel" },
    receiver: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "receiverModel" },
    senderModel: { type: String, required: true, enum: ["Mentor", "Admin"] },
    receiverModel: { type: String, required: true, enum: ["Mentor", "Admin"] },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
