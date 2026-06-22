const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==============================
// MIDDLEWARE
// ==============================

// CORS Configuration - Restricted to specific origins
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ==============================
// ROUTES
// ==============================
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const scholarshipRoutes = require("./routes/scholarshipRoutes");
app.use("/api/scholarships", scholarshipRoutes);

// ==============================
// TEST ROUTE
// ==============================
app.get("/", (req, res) => {
  res.status(200).json({
    message: "EduBridge Backend Running 🚀",
    version: "1.0.0"
  });
});

// ==============================
// HEALTH CHECK ROUTE
// ==============================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

// ==============================
// 404 HANDLER
// ==============================
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found ❌"
  });
});

// ==============================
// GLOBAL ERROR HANDLER
// ==============================
app.use((err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    message: message,
    error: process.env.NODE_ENV === "development" ? err : {}
  });
});

// ==============================
// MONGODB CONNECTION
// ==============================
if (!process.env.MONGO_URL) {
  console.error("ERROR: MONGO_URL not defined in .env file ❌");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("ERROR: JWT_SECRET not defined in .env file ❌");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ==============================
// SERVER STARTUP
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully...");
  mongoose.connection.close();
  process.exit(0);
});