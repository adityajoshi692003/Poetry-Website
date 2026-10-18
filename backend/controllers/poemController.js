import Poem from '../models/Poem.js';

export const getPoems = async (req, res, next) => {
  try {
    const { q, collection, year, language, theme } = req.query;
    const filter = {};

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { excerpt: { $regex: q, $options: 'i' } },
        { themes: { $regex: q, $options: 'i' } }
      ];
    }

    if (collection) filter.collection = collection;
    if (year) filter.year = Number(year);
    if (language) filter.language = language;
    if (theme) filter.themes = { $in: [theme] };

    const poems = await Poem.find(filter).populate('collection', 'title slug').sort({ year: -1, title: 1 });

    res.status(200).json({ count: poems.length, poems });
  } catch (error) {
    next(error);
  }
};

export const getPoemBySlug = async (req, res, next) => {
  try {
    const poem = await Poem.findOne({ slug: req.params.slug }).populate('collection', 'title slug');

    if (!poem) {
      return res.status(404).json({ message: 'Poem not found.' });
    }

    res.status(200).json({ poem });
  } catch (error) {
    next(error);
  }
};
