const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const validateRequest = require("../middlewares/validateRequest"); // تأكد من أنك استوردت validateRequest
const videoSchema = require("../schemas/videoSchema"); // استيراد الـ Joi Schema
const { default: videoValidationSchema } = require("../schemas/videoSchema");

// Create a new video
router.post("/", validateRequest(videoValidationSchema), videoController.createVideo);

// Get all videos
router.get("/", videoController.getAllVideos);

// Get a video by ID
router.get("/:id", videoController.getVideoById);

// Update a video by ID
router.put("/:id", validateRequest(videoValidationSchema), videoController.updateVideo);

// Delete a video by ID
router.delete("/:id", videoController.deleteVideo);

// Get all videos for a specific user
router.get("/user/:userId", videoController.getUserVideos);

// Add like to a video
router.post("/like/:id", videoController.addLike);

// Remove like from a video
router.delete("/like/:id", videoController.removeLike);

// Get comments for a specific video
router.get("/:id/comments", videoController.getCommentsForVideo);

module.exports = router;
