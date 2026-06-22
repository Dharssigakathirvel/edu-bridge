const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  class: {
    type: String,
    required: true,
    trim: true
  },

  obtainedMarks: {
    type: Number,
    required: true,
    min: 0
  },

  totalMarks: {
    type: Number,
    required: true,
    min: 0
  },

  percentage: {
    type: Number,
    min: 0,
    max: 100
  },

  state: {
    type: String,
    trim: true
  },

  interest: {
    type: String,
    trim: true
  },

  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student"
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);