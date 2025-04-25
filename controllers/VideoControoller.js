const cloudinary = require("../config/Cloudinary"); // استيراد إعدادات Cloudinary
const Video = require("../models/Video");  // استيراد موديل الفيديوهات من MongoDB

// رفع فيديو
const uploadVideo = async (req, res) => {
  try {
    // رفع الفيديو إلى Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",  // تحديد نوع المحتوى كـ فيديو
      public_id: `videos/${req.file.filename}`,  // تعيين اسم الفيديو في Cloudinary
      overwrite: true  // استبدال الفيديو بنفس الاسم إذا كان موجودًا
    });

    // إنشاء كائن فيديو جديد
    const newVideo = new Video({
      title: req.body.title,  // أخذ العنوان من الـ body
      description: req.body.description,  // أخذ الوصف من الـ body
      videoUrl: result.secure_url,  // رابط الفيديو من Cloudinary
      user: req.body.userId  // ربط الفيديو بالمستخدم
    });

    // حفظ الفيديو في قاعدة البيانات
    await newVideo.save();

    // الرد على العميل بنجاح رفع الفيديو
    res.status(201).json({ message: "Video uploaded successfully", video: newVideo });

  } catch (err) {
    // في حالة حدوث خطأ أثناء رفع الفيديو
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  uploadVideo
};
