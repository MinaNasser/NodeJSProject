const cloudinary = require("../config/Cloudinary");
const Video = require("../models/Video");
const Comment = require("../models/Comment");

// ✅ رفع فيديو إلى Cloudinary وحفظه في MongoDB
exports.uploadVideo = async (req, res) => {
  try {
    console.log("📥 File received:", req.file);
    console.log("📥 Body received:", req.body);

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      public_id: `videos/${Date.now()}`,
      overwrite: true
    });

    const newVideo = new Video({
      title: req.body.title,
      description: req.body.description,
      videoUrl: result.secure_url,
      user: req.body.userId
    });

    await newVideo.save();

    res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
  } catch (err) {
    console.error("🔥 Upload error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// ✅ إرجاع جميع الفيديوهات
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("user", "username email");
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ إرجاع فيديو واحد عن طريق ID
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("user", "username email");
    if (!video) return res.status(404).json({ error: "Video not found" });
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ تحديث فيديو
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

// ✅ حذف فيديو
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ جلب فيديوهات مستخدم معين
exports.getUserVideos = async (req, res) => {
  try {
    const { userId } = req.params;
    const videos = await Video.find({ user: userId }).populate("user", "username email");
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ إضافة لايك لفيديو
exports.addLike = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    if (!video.likes.includes(req.user.userId)) {
      video.likes.push(req.user.userId);
      await video.save();
      res.status(200).json(video);
    } else {
      res.status(400).json({ error: "Already liked" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ إزالة لايك من فيديو
exports.removeLike = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    const likeIndex = video.likes.indexOf(req.user.userId);
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

// ✅ جلب التعليقات لفيديو معين
exports.getCommentsForVideo = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.id }).populate("user", "username email");
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
