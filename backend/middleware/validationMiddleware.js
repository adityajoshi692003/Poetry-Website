import validator from 'validator';

export const sanitizeText = (value = '') => {
  if (typeof value !== 'string') return '';
  return validator.escape(value.trim());
};

export const validateContact = (req, res, next) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required.' });
  }

  if (typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ message: 'Please enter a valid name.' });
  }

  if (typeof email !== 'string' || !validator.isEmail(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ message: 'Message must be at least 10 characters long.' });
  }

  req.body.name = sanitizeText(name);
  req.body.email = validator.normalizeEmail(email, { gmail_remove_dots: false });
  req.body.message = sanitizeText(message);

  next();
};

export default { sanitizeText, validateContact };
