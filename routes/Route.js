const express = require("express");
const router = express.Router();
// add user routes
// const videoRoutes = require("./videoRoutes");
// const userRoutes = require("./userRoutes");

router.get("/", (req, res) => {
  res.send("TikTok Clone API Running...");
});



module.exports = router;
