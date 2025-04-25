const express = require("express");
const router = express.Router();

// first router
const userRoutes = require("./userRoutes");
router.use("/users" , userRoutes);

router.get("/",)