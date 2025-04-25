const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  videoUrl: {
    type: String,
    required: true
  },
  smallimg: { type: String },
  tags: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  isPublic: { type: Boolean, default: true },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]

}, { timestamps: true });

module.exports = mongoose.model("Video", videoSchema);
