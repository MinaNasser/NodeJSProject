const Video = require("../models/Video");
const Comment = require("../models/Comment");

// Create a new video
exports.createVideo = async (req, res) => {
  try {
    const video = new Video(req.body);
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("user", "username email");
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a video by ID
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("user", "username email");
    if (!video) return res.status(404).json({ error: "Video not found" });
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a video
exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!video) return res.status(404).json({ error: "Video not found" });
    res.status(200).json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a video
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get videos by user ID
exports.getUserVideos = async (req, res) => {
  try {
    const { userId } = req.params;
    const videos = await Video.find({ user: userId }).populate("user", "username email");
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Add like to a video
exports.addLike = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    // Assuming the user is authenticated and their ID is available as req.user.id
    if (!video.likes.includes(req.user.id)) {
      video.likes.push(req.user.id);
      await video.save();
      res.status(200).json(video);
    } else {
      res.status(400).json({ error: "Already liked" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove like from a video
exports.removeLike = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    const likeIndex = video.likes.indexOf(req.user.id);
    if (likeIndex > -1) {
      video.likes.splice(likeIndex, 1);
      await video.save();
      res.status(200).json(video);
    } else {
      res.status(400).json({ error: "Like not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get comments for a specific video
exports.getCommentsForVideo = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.id }).populate("user", "username email");
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
