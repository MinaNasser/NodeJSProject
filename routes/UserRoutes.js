const express = require("express");

const multer = require("multer");
const router = express.Router();

const { register, login, verifyEmail } = require("../controllers/UserController");
const upload = multer({ dest: "uploads/" });

router.post("/register",upload.single("avatar"), register);
router.post("/login", login);
router.get("/verify-email/:token", verifyEmail);

module.exports = router;