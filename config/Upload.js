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
const ImageStorage = new cloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    allowedFormats: ["jpg", "jpeg", "png"],
    resource_type: "image"
  }
});

// create multer to save videos to Cloudinary
const upload = multer({ storage: VideoStorage  });  // Use VideoStorage here
const uploadImage = multer({ storage: ImageStorage });

module.exports = {upload, uploadImage};
