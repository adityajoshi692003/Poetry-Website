import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    thumbnail: { type: String, default: '' },
    videoUrl: { type: String, required: true },
    featured: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const Video = mongoose.model('Video', videoSchema);

export default Video;
