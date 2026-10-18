import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    theme: { type: String, required: true },
    coverImage: { type: String, default: '' },
    year: { type: Number, required: true },
    poemCount: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;
