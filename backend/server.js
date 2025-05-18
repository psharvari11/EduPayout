
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectdb = require("./config/db");
const mentorRoutes = require("./routes/mentorRoutes.js");
const sessionRoutes = require("./routes/sessionroutes.js");
const adminRoutes = require("./routes/adminRoutes.js");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectdb();
app.get("/",(req,res)=>{
  res.send("welcome")
})
app.use("/api/mentors", mentorRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

