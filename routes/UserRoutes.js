const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/UserController");

router.post("/register", register);
router.post("/login", login);
// router.get("/verify-email/:token", verifyEmail);

module.exports = router;