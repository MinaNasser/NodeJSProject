const cloudinary = require("cloudinary").v2;

// إعداد Cloudinary باستخدام المتغيرات من .env
cloudinary.config({
  CloudName: process.env.CLOUDNAME,
  ApiKey: process.env.APIKEY,
  ApiSecret: process.env.APISECRET
});

module.exports = cloudinary;