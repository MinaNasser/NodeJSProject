const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");

// Create a new video
router.post("/", videoController.createVideo);

// Get all videos
router.get("/", videoController.getAllVideos);

// Get a video by ID
router.get("/:id", videoController.getVideoById);

// Update a video by ID
router.put("/:id", videoController.updateVideo);

// Delete a video by ID
router.delete("/:id", videoController.deleteVideo);
// Get all videos for a specific user
router.get("/user/:userId", videoController.getUserVideos);


module.exports = router;
