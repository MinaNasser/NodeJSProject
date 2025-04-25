const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");

const routes = require("./routes/Route");

const app = express();

// تحميل متغيرات البيئة
dotenv.config();

// الاتصال بقاعدة البيانات
connectDB();

// إعداد body parser للبروجيكت
app.use(express.json());

// الراوتس
app.use("/api", routes);
app.use("/api/videos", videoRoute);

// هندلر لما الروت مش موجود
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});