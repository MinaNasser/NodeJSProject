const express = require("express");
const router = express.Router();
const videoControoller = require("../controllers/videoController");
const validateRequest = require("../middlewares/validationRequest");
const videoSchema = require("../schemas/videoSchema"); // استيراد الـ Joi Schema
const { default: videoValidationSchema } = require("../schemas/videoSchema");

// Create a new video
router.post("/",  videoControoller.uploadVideo);

// Get all videos
router.get("/", videoControoller.getAllVideos);

// Get a video by ID
router.get("/:id", videoControoller.getVideoById);

// Update a video by ID
router.put("/:id",  videoControoller.updateVideo);

// Delete a video by ID
router.delete("/:id", videoControoller.deleteVideo);

// Get all videos for a specific user
router.get("/user/:userId", videoControoller.getUserVideos);

// Add like to a video
router.post("/like/:id", videoControoller.addLike);

// Remove like from a video
router.delete("/like/:id", videoControoller.removeLike);

// Get comments for a specific video
router.get("/:id/comments", videoControoller.getCommentsForVideo);

module.exports = router;
