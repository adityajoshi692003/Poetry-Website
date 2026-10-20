import mongoose from 'mongoose';

const poemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
    language: { type: String, default: 'English' },
    themes: [{ type: String }],
    year: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    coverImage: { type: String, default: '' }
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true
  }
);

const Poem = mongoose.model('Poem', poemSchema);

export default Poem;
