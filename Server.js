const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const videoRoutes = require("./routes/videoRoutes"); // ✅ تأكدي من الاسم
const routes = require("./routes/Route");

const app = express();

dotenv.config();
connectDB();

app.use(express.json());

app.use("/api", routes);
app.use("/api/videos", videoRoutes); // ✅ استخدمي المتغير الصحيح
app.use("/api/users", require("./routes/userRoutes")); // ✅ تأكدي من الاسم
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});


const PORT = process.env.PORT || 5000;
app.use(express.json()); // <-- مهم جدًا لقراءة JSON من body
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


