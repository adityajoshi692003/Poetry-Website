import express from 'express';
import { submitContactMessage } from '../controllers/contactController.js';
import { validateContact } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/', validateContact, submitContactMessage);

export default router;
