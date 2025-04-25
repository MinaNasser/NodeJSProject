// routes/replyRoutes.js
import express from 'express';
import {
  createReply,
  getRepliesByComment,
  deleteReply,
} from '../controllers/replyController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST: create reply
router.post('/:commentId', protect, createReply);

// GET: get all replies for a comment
router.get('/:commentId', getRepliesByComment);

// DELETE: delete a reply
router.delete('/:id', protect, deleteReply);

export default router;
