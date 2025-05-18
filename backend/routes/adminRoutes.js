const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
} = require("../controllers/admincontroller");
const { protectAdmin } = require("../middlewares/authMiddleware");

// Public routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Private route
router.get("/profile", protectAdmin, getAdminProfile);

module.exports = router;
