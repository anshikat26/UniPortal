const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");


// ==============================
// REGISTER (SIGNUP)
// ==============================
router.post("/register", async (req, res) => {
  const { name, course, instituteId, dob, phone, email, password, role } = req.body;

  try {

    console.log("REGISTER BODY:", req.body); // 🔥 DEBUG

    // check if user already exists
    const existingUser = await User.findOne({ instituteId });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 FINAL ROLE FIX
    let userRole = "student"; // default

    if (role && role === "admin") {
      userRole = "admin";
    }

    // create new user
    const user = new User({
      name,
      course,
      instituteId,
      dob,
      phone,
      email,
      password: hashedPassword,
      role: userRole   // 🔥 FIXED HERE
    });

    await user.save();

    res.json({ message: "Account created successfully ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==============================
// LOGIN
// ==============================
router.post("/login", async (req, res) => {
  const { instituteId, password } = req.body;

  try {

    console.log("LOGIN ID:", instituteId); // 🔥 DEBUG

    const user = await User.findOne({ instituteId });

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password ❌" });
    }

    res.json({
      message: "Login successful ✅",
      role: user.role,
      user: {
        name: user.name,
        course: user.course,
        instituteId: user.instituteId
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==============================
// FORGOT PASSWORD
// ==============================
router.post("/forgot", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found ❌" });
    }

    res.json({ message: "Reset link sent (dummy) ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;