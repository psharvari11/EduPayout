const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema(
  {
    payout: { type: mongoose.Schema.Types.ObjectId, ref: "Payout", required: true },
    pdfUrl: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Receipt", receiptSchema);
