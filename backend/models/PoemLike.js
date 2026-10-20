import mongoose from 'mongoose';

const poemLikeSchema = new mongoose.Schema(
  {
    poem: { type: mongoose.Schema.Types.ObjectId, ref: 'Poem', required: true },
    visitorId: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

poemLikeSchema.index({ poem: 1, visitorId: 1 }, { unique: true });

const PoemLike = mongoose.model('PoemLike', poemLikeSchema);

export default PoemLike;
