const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema(
  {
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
    grossAmount: { type: Number, required: true },
    platformFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "under review"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payout", payoutSchema);
