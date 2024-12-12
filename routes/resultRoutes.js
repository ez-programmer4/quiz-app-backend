const express = require("express");
const router = express.Router();
const {
  saveResult,
  getUserResults,
} = require("../controllers/resultController");
const authenticate = require("../middleware/authMiddleware");

router.post("/", authenticate, saveResult); // Endpoint to save results
router.get("/", authenticate, getUserResults); // Endpoint to get user results

module.exports = router;
