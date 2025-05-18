const Mentor = require("../models/mentor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register mentor (hash password before saving)
const registerMentor = async (req, res) => {
  const { name, email, password } = req.body;

  const mentorExists = await Mentor.findOne({ email });
  if (mentorExists) {
    return res.status(400).json({ message: "Mentor already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const mentor = await Mentor.create({
    name,
    email,
    password: hashedPassword,
  });

  if (mentor) {
    res.status(201).json({
      _id: mentor._id,
      name: mentor.name,
      email: mentor.email,
      token: generateToken(mentor._id),
    });
  } else {
    res.status(400).json({ message: "Invalid mentor data" });
  }
};

// Login mentor (compare hashed password)
const loginMentor = async (req, res) => {
  const { email, password } = req.body;

  const mentor = await Mentor.findOne({ email });
  if (mentor && (await bcrypt.compare(password, mentor.password))) {
    res.json({
      _id: mentor._id,
      name: mentor.name,
      email: mentor.email,
      token: generateToken(mentor._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// Get mentor profile
const getMentorProfile = async (req, res) => {
  const mentor = await Mentor.findById(req.user._id).select("-password");
  if (mentor) {
    res.json(mentor);
  } else {
    res.status(404).json({ message: "Mentor not found" });
  }
};

module.exports = {
  registerMentor,
  loginMentor,
  getMentorProfile,
};
