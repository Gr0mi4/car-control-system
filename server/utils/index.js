const fs = require('fs');
const client = require('https');
const myCloudinary = require('../utils/cloudinarySettings');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null, 'temporaryImage.jpg');
  },
});

const saveImageToLocal = multer({ storage: storage });

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        // Consume response data to free up memory
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${ res.statusCode }`));
      }
    });
  });
}

function convertCropToPx(originalHeight, originalWidth, crop) {
  console.log(crop, originalHeight, originalWidth);
  return {
    width: Math.round((originalWidth / 100) * crop.width),
    height: Math.round((originalHeight / 100) * crop.height),
    left: Math.round((originalWidth / 100) * crop.x),
    top: Math.round((originalHeight / 100) * crop.y),
  };
}

async function uploadImage(filePath) {
  return new Promise((resolve, reject) => {
    try {
      myCloudinary.uploader.upload(filePath)
        .then((res) => {
          console.log('secureUrl from Cloudinary received', res.secure_url);
          resolve(res.secure_url);
        });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

async function destroyImageOnServer(publicId) {
  return new Promise((resolve, reject) => {
    try {
      myCloudinary.uploader.destroy(publicId)
        .then((res) => {
          console.log('Image deleted from server', res);
          resolve();
        });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

module.exports = { downloadImage, convertCropToPx, uploadImage, saveImageToLocal, destroyImageOnServer };
