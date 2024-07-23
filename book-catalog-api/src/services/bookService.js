const Book = require("../models/book");

const createBook = async (data) => {
  const book = new Book(data);
  return book.save();
};

const getAllBooks = async (query, options) => {
  const { page = 1, limit = 10 } = options;
  const books = await Book.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await Book.countDocuments(query);
  return { books, total, pages: Math.ceil(total / limit) };
};

const getBookById = async (id) => {
  return Book.findById(id);
};

const updateBook = async (id, data) => {
  return Book.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteBook = async (id) => {
  return Book.findByIdAndDelete(id);
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
