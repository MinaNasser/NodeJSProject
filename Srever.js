const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();



// تحميل متغيرات البيئة
dotenv.config();

// الاتصال بقاعدة البيانات
connectDB();

// إعداد الميدل وير
app.use(express.json());

// الراوتس
const routes = require("./routes/Route");
app.use("/api", routes);
app.use("/api/videos", videoRoutes);
app.use(notFound);
app.use(errorHandler);


// تشغيل السيرفر
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
