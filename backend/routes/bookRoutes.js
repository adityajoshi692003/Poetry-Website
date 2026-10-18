import express from 'express';
import { getBooks, getFeaturedBook } from '../controllers/bookController.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/featured', getFeaturedBook);

export default router;
