import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    coverImage: { type: String, default: '' },
    author: { type: String, default: 'Sunil Joshi' },
    year: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    purchaseUrl: { type: String, default: '' }
  },
  {
    timestamps: true
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
