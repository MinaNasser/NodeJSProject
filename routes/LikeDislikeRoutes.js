import express from 'express';
import { likeDislikeContent, getLikesDislikes } from '../controllers/likeDislikeController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST: like/dislike a content (video/comment/reply)
router.post('/', protect, likeDislikeContent);

// GET: get likes and dislikes count for a content
router.get('/:contentType/:contentId', getLikesDislikes);

export default router;
