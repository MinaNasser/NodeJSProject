// to interact with files
const multer = require("multer");

// library for cloudinary to create storage in Cloudinary
const cloudinarymulter = require("multer-storage-cloudinary");
const cloudinaryStorage = cloudinarymulter.CloudinaryStorage;

// cloudinary configurations (key, name, secret)
const cloudinary = require("./Cloudinary");

// create the storage configuration for Cloudinary
const VideoStorage = new cloudinaryStorage({
  cloudinary: cloudinary,  // connect to cloudinary
  params: {
    folder: "videos",  // store videos in a folder named "videos"
    allowedFormats: ["mp4", "mov", "avi"],  // allowed video formats
    resource_type: "video"  // specify that we are uploading videos
  }
});

// create multer to save videos to Cloudinary
const upload = multer({ storage: VideoStorage });  // Use VideoStorage here

module.exports = upload;
