const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400).json({ message: "Invalid admin data" });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
       msg:"login",
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id)
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

const getAdminProfile = async (req, res) => {
  const admin = await Admin.findById(req.user._id).select("-password");
  if (admin) {
    res.json(admin);
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
};
