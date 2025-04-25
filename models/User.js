const { string, required } = require("joi");
const mongoose = require("mongoose");

// بنبني الشكل اللي الداتا هتتخزن بيه في MongoDB
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  phoneNumber: {
    type: String,
    required : true,
    trim: true
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  socialLinks: {
    instagram: String,
    tiktok: String,
    youtube: String
  },
  accountType: {
    type: String,
    enum: ["public", "private"],
    default: "public"
  },
  notifications: [{
    message: String,
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  avatar: String,
  bio: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
