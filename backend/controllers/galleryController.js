import GalleryItem from '../models/GalleryItem.js';

export const getGallery = async (req, res, next) => {
  try {
    const items = await GalleryItem.find().sort({ year: -1, createdAt: -1 });
    res.status(200).json({ count: items.length, gallery: items });
  } catch (error) {
    next(error);
  }
};
