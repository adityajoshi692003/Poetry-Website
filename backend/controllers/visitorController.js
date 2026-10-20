import validator from 'validator';
import Visitor from '../models/Visitor.js';

export const registerVisitor = async (req, res, next) => {
  try {
    const { visitorId } = req.body;

    if (typeof visitorId !== 'string' || !validator.isUUID(visitorId, 4)) {
      return res.status(400).json({ message: 'A valid visitor ID is required.' });
    }

    await Visitor.updateOne(
      { visitorId },
      { $setOnInsert: { visitorId } },
      { upsert: true }
    );

    const count = await Visitor.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    if (error.code === 11000) {
      try {
        const count = await Visitor.countDocuments();
        return res.status(200).json({ count });
      } catch (countError) {
        return next(countError);
      }
    }

    next(error);
  }
};
