const express = require("express");
const router = express.Router();
const {
  createSession,
  getSessions,
  getSessionById,
  processPayout,
} = require("../controllers/sessionController.js");
const { protectMentor, protectAdmin } = require("../middlewares/authMiddleware");

// Only mentors can create sessions
router.post("/", protectMentor, createSession);

// Mentors and admins can view sessions
router.get("/", protectMentor, getSessions);
router.get("/:mentorId", protectMentor, getSessionById);

// Admins only can process payouts
router.post("/:mentorId/payout", protectAdmin, processPayout);

module.exports = router;
