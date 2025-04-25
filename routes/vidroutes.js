const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const upload = require("../middlewares/upload"); // ✅ ميدل وير رفع الملفات
const protect = require("../middlewares/protect"); // لو عايزة حماية للراوتس (اختياري)

// رفع فيديو جديد
router.post("/upload", upload.single("video"), videoController.uploadVideo);

// كل فيديوهات مستخدم معين
router.get("/user/:userId", videoController.getUserVideos);

// كل الفيديوهات
router.get("/", videoController.getAllVideos);

// فيديو حسب ID
router.get("/:id", videoController.getVideoById);

// تعديل فيديو
router.put("/:id", videoController.updateVideo);

// حذف فيديو
router.delete("/:id", videoController.deleteVideo);

// إضافة لايك لفيديو (يفضل استخدام protect)
router.post("/like/:id", protect, videoController.addLike);

// حذف لايك من فيديو
router.delete("/like/:id", protect, videoController.removeLike);

// عرض تعليقات فيديو معين
router.get("/:id/comments", videoController.getCommentsForVideo);

module.exports = router;
