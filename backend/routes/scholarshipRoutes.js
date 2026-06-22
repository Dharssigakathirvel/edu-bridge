const express = require("express");
const router = express.Router();
const Scholarship = require("../models/Scholarship");
const { authenticate, authenticateAdmin } = require("../middleware/auth");

// ===============================
// ADD SCHOLARSHIP (ADMIN ONLY)
// ===============================
router.post("/add", authenticateAdmin, async (req, res) => {
  try {
    const {
      name,
      description,
      class: studentClass,
      minPercentage,
      state,
      officialLink,
      deadline
    } = req.body;

    // Validation
    if (!name || !description || !studentClass || minPercentage === undefined) {
      return res.status(400).json({
        message: "Missing required fields (name, description, class, minPercentage) ❌"
      });
    }

    if (minPercentage < 0 || minPercentage > 100) {
      return res.status(400).json({
        message: "Minimum percentage must be between 0-100 ❌"
      });
    }

    // Check for duplicate scholarship
    const existingScholarship = await Scholarship.findOne({ name });
    if (existingScholarship) {
      return res.status(409).json({
        message: "Scholarship with this name already exists ❌"
      });
    }

    const scholarship = new Scholarship({
      name,
      description,
      class: studentClass,
      minPercentage,
      state: state || "All",
      officialLink,
      deadline
    });

    await scholarship.save();

    res.status(201).json({
      message: "Scholarship added successfully 🎓",
      scholarship
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to add scholarship",
      error: error.message
    });
  }
});

// ===============================
// GET ALL SCHOLARSHIPS (PUBLIC)
// ===============================
router.get("/", async (req, res) => {
  try {
    const scholarships = await Scholarship.find();

    res.status(200).json({
      count: scholarships.length,
      scholarships
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch scholarships",
      error: error.message
    });
  }
});

// ===============================
// RECOMMEND SCHOLARSHIPS (SMART FILTER)
// ===============================
router.post("/recommend", authenticate, async (req, res) => {
  try {
    const { class: studentClass, percentage, state } = req.body;

    // Validation
    if (studentClass === undefined || percentage === undefined) {
      return res.status(400).json({
        message: "Class and percentage are required ❌"
      });
    }

    if (percentage < 0 || percentage > 100) {
      return res.status(400).json({
        message: "Percentage must be between 0-100 ❌"
      });
    }

    const scholarships = await Scholarship.find();

    const filtered = scholarships.filter((s) => {
      const percentageMatch = Number(percentage) >= Number(s.minPercentage);
      const classMatch = s.class === studentClass || s.class === "All";
      const stateMatch = !state || s.state === state || s.state === "All";

      return percentageMatch && classMatch && stateMatch;
    });

    res.status(200).json({
      count: filtered.length,
      scholarships: filtered
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Recommendation failed",
      error: error.message
    });
  }
});

// ===============================
// GET SCHOLARSHIP BY ID
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);

    if (!scholarship) {
      return res.status(404).json({
        message: "Scholarship not found ❌"
      });
    }

    res.status(200).json(scholarship);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch scholarship",
      error: error.message
    });
  }
});

// ===============================
// UPDATE SCHOLARSHIP (ADMIN ONLY)
// ===============================
router.put("/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate percentage if provided
    if (updates.minPercentage !== undefined) {
      if (updates.minPercentage < 0 || updates.minPercentage > 100) {
        return res.status(400).json({
          message: "Minimum percentage must be between 0-100 ❌"
        });
      }
    }

    const scholarship = await Scholarship.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!scholarship) {
      return res.status(404).json({
        message: "Scholarship not found ❌"
      });
    }

    res.status(200).json({
      message: "Scholarship updated successfully 🎓",
      scholarship
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update scholarship",
      error: error.message
    });
  }
});

// ===============================
// DELETE SCHOLARSHIP (ADMIN ONLY)
// ===============================
router.delete("/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const scholarship = await Scholarship.findByIdAndDelete(id);

    if (!scholarship) {
      return res.status(404).json({
        message: "Scholarship not found ❌"
      });
    }

    res.status(200).json({
      message: "Scholarship deleted successfully 🗑️"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to delete scholarship",
      error: error.message
    });
  }
});

module.exports = router;