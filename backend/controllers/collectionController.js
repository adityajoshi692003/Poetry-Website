import Collection from '../models/Collection.js';
import Poem from '../models/Poem.js';

export const getCollections = async (req, res, next) => {
  try {
    const collections = await Collection.find().sort({ year: -1, title: 1 });

    const data = await Promise.all(
      collections.map(async (collection) => {
        const poemCount = await Poem.countDocuments({ collection: collection._id });
        return {
          ...collection.toObject(),
          poemCount
        };
      })
    );

    res.status(200).json({ count: data.length, collections: data });
  } catch (error) {
    next(error);
  }
};

export const getCollectionBySlug = async (req, res, next) => {
  try {
    const collection = await Collection.findOne({ slug: req.params.slug });

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found.' });
    }

    const poems = await Poem.find({ collection: collection._id }).sort({ year: -1, title: 1 });
    const payload = {
      ...collection.toObject(),
      poemCount: poems.length,
      poems
    };

    res.status(200).json({ collection: payload });
  } catch (error) {
    next(error);
  }
};
