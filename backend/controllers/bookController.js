import Book from '../models/Book.js';

export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ featured: -1, year: -1 });
    res.status(200).json({ count: books.length, books });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedBook = async (req, res, next) => {
  try {
    const book = await Book.findOne({ featured: true }) || (await Book.findOne().sort({ year: -1 }));

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    res.status(200).json({ book });
  } catch (error) {
    next(error);
  }
};
