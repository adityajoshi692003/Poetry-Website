import Video from '../models/Video.js';

export const getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ featured: -1, createdAt: -1 });
    res.status(200).json({ count: videos.length, videos });
  } catch (error) {
    next(error);
  }
};
