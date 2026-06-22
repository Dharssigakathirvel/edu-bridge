const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  class: {
    type: String,
    required: true,
    trim: true
  },

  minPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },

  state: {
    type: String,
    default: "All",
    trim: true
  },

  officialLink: {
    type: String,
    match: /^https?:\/\/.+/  // Validates URL format
  },

  deadline: {
    type: String,
    validate: {
      validator: function(v) {
        // Basic date validation (YYYY-MM-DD format)
        return /^\d{4}-\d{2}-\d{2}$/.test(v);
      },
      message: "Deadline must be in YYYY-MM-DD format"
    }
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

// Indexes for faster queries
scholarshipSchema.index({ state: 1 });
scholarshipSchema.index({ class: 1 });
scholarshipSchema.index({ minPercentage: 1 });

module.exports = mongoose.model("Scholarship", scholarshipSchema);