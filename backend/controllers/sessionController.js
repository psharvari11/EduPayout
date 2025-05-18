const Session = require("../models/sessions.js");
const generateReceipt = require("../utils/receiptGenerator");

// @desc    Create new session (Mentor only)
// @route   POST /api/sessions
// @access  Private (Mentor)
const createSession = async (req, res) => {
  try {
    const { date, topic, duration, amount } = req.body;

    if (!date || !topic || !duration || !amount) {
      return res.status(400).json({ message: "Please provide all session details" });
    }

    const session = await Session.create({
      mentorId: req.user._id,
      date,
      topic,
      duration,
      amount,
      payoutStatus: "Pending",
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all sessions of logged in mentor
// @route   GET /api/sessions
// @access  Private (Mentor)
const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ mentorId: req.user._id }).sort({ date: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get session by ID (Mentor only can access their own session)
// @route   GET /api/sessions/:id
// @access  Private (Mentor)
const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.mentorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this session" });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Process payout (Admin only)
// @route   POST /api/sessions/:id/payout
// @access  Private (Admin)
const processPayout = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate("mentorId", "name");

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.payoutStatus === "Completed") {
      return res.status(400).json({ message: "Payout already processed" });
    }

    session.payoutStatus = "Completed";
    session.payoutDate = new Date();
    await session.save();

    const receipt = generateReceipt({
      mentorName: session.mentorId.name,
      sessionDate: session.date,
      amount: session.amount,
      payoutStatus: session.payoutStatus,
    });

    // No email sent, just return the receipt here
    res.json({ message: "Payout processed", session, receipt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSession,
  getSessions,
  getSessionById,
  processPayout,
};
