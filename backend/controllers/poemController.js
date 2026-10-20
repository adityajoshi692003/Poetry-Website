import Poem from '../models/Poem.js';
import PoemLike from '../models/PoemLike.js';
import validator from 'validator';

const findPoemForLikes = async (slug, res) => {
  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    decodedSlug = slug;
  }

  const poem = await Poem.findOne({
    $or: [
      { slug },
      { slug: decodedSlug },
      { title: slug },
      { title: decodedSlug }
    ]
  }).select('_id');
  if (!poem) res.status(404).json({ message: 'Poem not found.' });
  return poem;
};

export const getPoemLikeStatus = async (req, res, next) => {
  try {
    const { visitorId } = req.query;
    if (visitorId && !validator.isUUID(visitorId, 4)) {
      return res.status(400).json({ message: 'Invalid visitor ID.' });
    }

    const poem = await findPoemForLikes(req.params.slug, res);
    if (!poem) return;

    const [count, visitorLike] = await Promise.all([
      PoemLike.countDocuments({ poem: poem._id }),
      visitorId ? PoemLike.exists({ poem: poem._id, visitorId }) : null
    ]);

    res.status(200).json({ count, liked: Boolean(visitorLike) });
  } catch (error) {
    next(error);
  }
};

export const addPoemLike = async (req, res, next) => {
  try {
    const { visitorId } = req.body;
    if (!validator.isUUID(visitorId || '', 4)) {
      return res.status(400).json({ message: 'A valid visitor ID is required.' });
    }

    const poem = await findPoemForLikes(req.params.slug, res);
    if (!poem) return;

    try {
      await PoemLike.updateOne(
        { poem: poem._id, visitorId },
        { $setOnInsert: { poem: poem._id, visitorId } },
        { upsert: true }
      );
    } catch (error) {
      if (error.code !== 11000) throw error;
    }

    const count = await PoemLike.countDocuments({ poem: poem._id });
    res.status(200).json({ count, liked: true });
  } catch (error) {
    next(error);
  }
};

export const removePoemLike = async (req, res, next) => {
  try {
    const { visitorId } = req.body;
    if (!validator.isUUID(visitorId || '', 4)) {
      return res.status(400).json({ message: 'A valid visitor ID is required.' });
    }

    const poem = await findPoemForLikes(req.params.slug, res);
    if (!poem) return;

    await PoemLike.deleteOne({ poem: poem._id, visitorId });
    const count = await PoemLike.countDocuments({ poem: poem._id });
    res.status(200).json({ count, liked: false });
  } catch (error) {
    next(error);
  }
};

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
    const rawSlug = req.params.slug;
    let decodedSlug = rawSlug;
    try {
      decodedSlug = decodeURIComponent(rawSlug);
    } catch {
      decodedSlug = rawSlug;
    }

    const poem = await Poem.findOne({
      $or: [
        { slug: rawSlug },
        { slug: decodedSlug },
        { title: rawSlug },
        { title: decodedSlug }
      ]
    }).populate('collection', 'title slug');

    if (!poem) {
      return res.status(404).json({ message: 'Poem not found.' });
    }

    res.status(200).json({ poem });
  } catch (error) {
    next(error);
  }
};
