const express = require("express");

const multer = require("multer");
const router = express.Router();
const upload = require("../middlewares/upload");

const { register, login } = require("../controllers/UserController");

router.post("/register",upload.single("avatar"), register);
router.post("/login", login);
// router.get("/verify-email/:token", verifyEmail);

module.exports = router;