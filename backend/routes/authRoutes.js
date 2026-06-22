const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Validation helper
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

// ==============================
// SIGNUP
// ==============================
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      class: studentClass,
      obtainedMarks,
      totalMarks,
      state,
      interest,
      password
    } = req.body;

    // Validation
    if (!name || !email || !password || !studentClass || !totalMarks || !obtainedMarks) {
      return res.status(400).json({
        message: "Missing required fields ❌"
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format ❌"
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message: "Password must be at least 6 characters ❌"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered ❌"
      });
    }

    // Calculate percentage
    const percentage = (obtainedMarks / totalMarks) * 100;

    if (percentage < 0 || percentage > 100) {
      return res.status(400).json({
        message: "Invalid marks - percentage must be between 0-100 ❌"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      class: studentClass,
      obtainedMarks,
      totalMarks,
      percentage,
      state,
      interest,
      password: hashedPassword
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Account created successfully 🎉",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        class: user.class,
        state: user.state,
        percentage: user.percentage
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

// ==============================
// LOGIN
// ==============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required ❌"
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found ❌"
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password ❌"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful 🎉",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        class: user.class,
        state: user.state,
        percentage: user.percentage
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;