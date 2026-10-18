import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: '' },
    location: { type: String, default: '' },
    year: { type: Number, default: new Date().getFullYear() }
  },
  {
    timestamps: true
  }
);

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);

export default GalleryItem;
