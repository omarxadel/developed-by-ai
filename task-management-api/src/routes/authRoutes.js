const express = require("express");
const { body, validationResult } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

// Middleware for input validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Register a new user
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Must be a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    validate,
  ],
  authController.register
);

// Login user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Must be a valid email address"),
    body("password").notEmpty().withMessage("Password is required"),
    validate,
  ],
  authController.login
);

// Get user profile
router.get("/profile", auth, authController.getProfile);

module.exports = router;
