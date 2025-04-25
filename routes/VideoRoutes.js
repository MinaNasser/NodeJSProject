const express = require("express");
const router = express.Router();

const upload = require("../config/uploads");  // استيراد إعدادات multer
const { uploadVideo } = require("../controllers/VideoControoller");  // استيراد دوال الكنترولر

// رفع الفيديو
router.post("/upload", upload.single("video"), uploadVideo);


module.exports = router;
