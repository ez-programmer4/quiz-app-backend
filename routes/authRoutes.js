const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController"); // Adjust the path if necessary

// Define your routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;
