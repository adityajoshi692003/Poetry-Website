import express from 'express';
import { addPoemLike, getPoemBySlug, getPoemLikeStatus, getPoems, removePoemLike } from '../controllers/poemController.js';

const router = express.Router();

router.get('/', getPoems);
router.get('/:slug/likes', getPoemLikeStatus);
router.put('/:slug/likes', addPoemLike);
router.delete('/:slug/likes', removePoemLike);
router.get('/:slug', getPoemBySlug);

export default router;
