const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

// Register a new user
router.post("/register", userController.registerUser);

// Login a user
router.post("/login", userController.loginUser);

// Get user profile by ID (Requires authentication)
router.get("/:id", auth, userController.getUserById);

module.exports = router;
