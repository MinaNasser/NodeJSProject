const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    // الحصول على التوكن من الهيدر
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // استخراج التوكن
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // إرفاق بيانات اليوزر بالطلب
    req.user = decoded; // decoded يحتوي على userId و role

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = protect;
