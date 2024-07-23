const express = require("express");
const bookController = require("../controllers/bookController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// Create a new book (Requires authentication)
router.post("/", auth, isAdmin, bookController.createBook);

// Get all books with pagination
router.get("/", bookController.getAllBooks);

// Get a book by ID
router.get("/:id", bookController.getBookById);

// Update a book by ID (Requires authentication)
router.put("/:id", auth, isAdmin, bookController.updateBook);

// Delete a book by ID (Requires authentication)
router.delete("/:id", auth, isAdmin, bookController.deleteBook);

module.exports = router;
