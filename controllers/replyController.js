// replyController.js
import Reply from '../models/reply.js';
import Comment from '../models/Comment.js';

// @desc    Create a reply to a comment
// @route   POST /api/replies/:commentId
// @access  Private
const createReply = async (req, res) => {
  try {
    const { text } = req.body;
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const reply = await Reply.create({
      comment: commentId,
      user: req.user._id,
      text,
    });

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all replies for a comment
// @route   GET /api/replies/:commentId
// @access  Public
const getRepliesByComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const replies = await Reply.find({ comment: commentId })
      .populate('user', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a reply
// @route   DELETE /api/replies/:id
// @access  Private (Owner or Admin)
const deleteReply = async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);

    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    if (reply.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await reply.deleteOne();
    res.json({ message: 'Reply deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createReply, getRepliesByComment, deleteReply };
