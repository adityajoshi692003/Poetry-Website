import express from 'express';
import { getPoemBySlug, getPoems } from '../controllers/poemController.js';

const router = express.Router();

router.get('/', getPoems);
router.get('/:slug', getPoemBySlug);

export default router;
