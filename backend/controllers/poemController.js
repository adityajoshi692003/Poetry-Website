import { createHash } from 'node:crypto';
import mongoose from 'mongoose';
import Poem from '../models/Poem.js';
import PoemLike from '../models/PoemLike.js';
import validator from 'validator';

const findPoemLikeTarget = async (slug) => {
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

  const slugPoemId = new mongoose.Types.ObjectId(
    createHash('sha256').update(decodedSlug).digest('hex').slice(0, 24)
  );
  const poemId = poem?._id || slugPoemId;
  const query = poem
    ? { poem: { $in: [poemId, slugPoemId] } }
    : { poem: poemId };

  return { poemId, query };
};

export const getPoemLikeStatus = async (req, res, next) => {
  try {
    const { visitorId } = req.query;
    if (visitorId && !validator.isUUID(visitorId, 4)) {
      return res.status(400).json({ message: 'Invalid visitor ID.' });
    }

    const { query } = await findPoemLikeTarget(req.params.slug);
    const [visitors, visitorLike] = await Promise.all([
      PoemLike.distinct('visitorId', query),
      visitorId ? PoemLike.exists({ ...query, visitorId }) : null
    ]);

    res.status(200).json({ count: visitors.length, liked: Boolean(visitorLike) });
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

    const { poemId, query } = await findPoemLikeTarget(req.params.slug);

    try {
      await PoemLike.updateOne(
        { ...query, visitorId },
        { $setOnInsert: { poem: poemId, visitorId } },
        { upsert: true }
      );
    } catch (error) {
      if (error.code !== 11000) throw error;
    }

    const count = (await PoemLike.distinct('visitorId', query)).length;
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

    const { query } = await findPoemLikeTarget(req.params.slug);

    await PoemLike.deleteMany({ ...query, visitorId });
    const count = (await PoemLike.distinct('visitorId', query)).length;
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
      if (typeof q !== 'string' || q.length > 100) {
        return res.status(400).json({ message: 'Search query must be 100 characters or fewer.' });
      }

      const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [
        { title: { $regex: escapedQuery, $options: 'i' } },
        { excerpt: { $regex: escapedQuery, $options: 'i' } },
        { themes: { $regex: escapedQuery, $options: 'i' } }
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
