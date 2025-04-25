const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");
const videoRoutes = require("./routes/video"); // ✅ تأكدي من الاسم
const routes = require("./routes/Route");

const app = express();

dotenv.config();
connectDB();

app.use(express.json());

app.use("/api", routes);
app.use("/api/videos", videoRoutes); // ✅ استخدمي المتغير الصحيح

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
