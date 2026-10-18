import ContactMessage from '../models/ContactMessage.js';

export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    const contactMessage = await ContactMessage.create({
      name,
      email,
      message
    });

    res.status(201).json({
      message: 'Your message has been received. The poet will respond soon.',
      contactMessage
    });
  } catch (error) {
    next(error);
  }
};
