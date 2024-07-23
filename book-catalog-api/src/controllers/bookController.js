const AppError = require("../middleware/AppError");
const bookService = require("../services/bookService");
const { tryCatchFn } = require("../utils");

const createBook = tryCatchFn(async (req, res) => {
  const book = await bookService.createBook({
    ...req.body,
    addedBy: req.userId,
  });
  res.status(201).send(book);
});

const getAllBooks = tryCatchFn(async (req, res) => {
  const { books, total, pages } = await bookService.getAllBooks(
    req.query,
    req.query
  );
  res.status(200).send({ books, total, pages });
});

const getBookById = tryCatchFn(async (req, res) => {
  const book = await bookService.getBookById(req.params.id);
  if (!book) throw new AppError("Book not found", 404);
  res.status(200).send(book);
});

const updateBook = tryCatchFn(async (req, res) => {
  const book = await bookService.updateBook(req.params.id, {
    ...req.body,
    addedBy: req.userId,
  });
  if (!book) throw new AppError("Book not found", 404);
  res.status(200).send(book);
});

const deleteBook = tryCatchFn(async (req, res) => {
  const book = await bookService.getBookById(req.params.id);
  if (!book) throw new AppError("Book not found", 404);
  if (book.addedBy !== req.userId)
    throw new AppError("You are not authorized to delete this book", 401);
  await bookService.deleteBook(req.params.id);
  res.status(200).send("Book deleted");
});

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
