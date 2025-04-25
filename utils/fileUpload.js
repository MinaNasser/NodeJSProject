import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';

// Configure local storage
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/videos');
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

// Configure cloud storage (Google Cloud Storage)
const cloudStorage = new Storage({
  credentials: JSON.parse(process.env.CLOUD_STORAGE_KEY),
});

const bucketName = 'video-management-app';

// Multer upload for local storage
const uploadLocal = multer({
  storage: localStorage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4|mov|avi|wmv|flv|mkv/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only video files are allowed!'));
  },
});

// Upload to cloud storage
const uploadToCloud = async (filePath, fileName) => {
  try {
    await cloudStorage.bucket(bucketName).upload(filePath, {
      destination: fileName,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });

    // Make the file public
    await cloudStorage.bucket(bucketName).file(fileName).makePublic();

    // Get the public URL
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    
    // Delete the local file
    fs.unlinkSync(filePath);
    
    return publicUrl;
  } catch (error) {
    console.error('Error uploading to cloud storage:', error);
    throw error;
  }
};

// Process video (generate thumbnail and get duration)
const processVideo = (filePath) => {
  return new Promise((resolve, reject) => {
    const thumbnailPath = `public/thumbnails/${path.basename(filePath, path.extname(filePath))}.jpg`;
    
    ffmpeg(filePath)
      .screenshots({
        count: 1,
        folder: 'public/thumbnails',
        filename: `${path.basename(filePath, path.extname(filePath))}.jpg`,
        size: '320x240',
      })
      .ffprobe((err, metadata) => {
        if (err) {
          return reject(err);
        }
        
        const duration = metadata.format.duration;
        resolve({ thumbnailPath, duration });
      });
  });
};

export { uploadLocal, uploadToCloud, processVideo };