require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Models
const User = require("./models/User");

// Routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DEBUG
console.log("MONGO URI:", process.env.MONGO_URI);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("DB Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// 🔥 IMPORTANT: ROUTES (listen se pehle)
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Server start
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});