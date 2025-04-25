const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");
const videoRoutes = require("./routes/vidroutes"); // ✅ تأكدي من الاسم
const routes = require("./routes/Route");
const userRoutes = require("./routes/userRoutes"); // أو المسار حسب مكان الملف

const app = express();

dotenv.config();
connectDB();

app.use(express.json());

app.use("/api", routes);
app.use("/api/videos", videoRoutes); // ✅ استخدمي المتغير الصحيح
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.use(express.json()); // <-- مهم جدًا لقراءة JSON من body
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


