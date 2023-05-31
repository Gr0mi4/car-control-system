const fs = require('fs');
const client = require('https');
const { v2: cloudinary } = require('cloudinary');

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
};

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
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
      cloudinary.uploader.upload(filePath)
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

module.exports = { downloadImage, convertCropToPx, uploadImage };
