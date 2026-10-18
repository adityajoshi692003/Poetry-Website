import express from 'express';
import { getCollectionBySlug, getCollections } from '../controllers/collectionController.js';

const router = express.Router();

router.get('/', getCollections);
router.get('/:slug', getCollectionBySlug);

export default router;
