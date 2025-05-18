const express = require("express");
const router = express.Router();
const {
 registerMentor,
  loginMentor,
  getMentorProfile
} = require("../controllers/mentorcontroller");
const { protectMentor } = require("../middlewares/authMiddleware");

// Public routes
router.post("/register", registerMentor);
router.post("/login", loginMentor);

// Private route
router.get("/profile", protectMentor, getMentorProfile);

module.exports = router;
