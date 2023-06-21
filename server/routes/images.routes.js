const { Router } = require('express');
const sharp = require('sharp');
const fs = require('fs');

const Image = require('../models/Images');
const cloudinary = require('cloudinary').v2;

const { downloadImage, convertCropToPx, uploadImage, saveImageToLocal } = require('../utils');

const router = Router();

router.post('/uploadAdditionalImage', async (req, res) => {
  try {
    const { vehicleId, src, name } = req.body;
    const image = new Image({ vehicleId, src, name, date: new Date().getTime() });
    await image.save();
    res.status(201).json({ message: 'Image uploaded' });
  } catch (e) {
    console.log(e);
    res.status(500).json('Something went wrong');
  }
});

router.post('/getAdditionalImages', async (req, res) => {
  try {
    const { vehicleId } = req.body;
    const vehicleImages = await Image.find({ vehicleId });
    if (vehicleImages.length > 0) {
      res.status(200).json(vehicleImages);
    } else {
      res.status(200).json([]);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json('Something went wrong');
  }
});

router.post('/deleteAdditionalImages', async (req, res) => {
  try {
    const { imageId } = req.body;
    await Image.deleteOne({ _id: imageId })
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (e) {
    console.log(e);
    res.status(500).json('Something went wrong');
  }
});

router.get('/getVariables', async (req, res) => {
  const data = await createImageUpload();
  if (data) {
    res.status(201).json({ message: 'Everything is ok', timestamp: data.timestamp, signature: data.signature });
  } else {
    res.status(500).json({ message: 'Variables was not generated' });
  }
});

async function createImageUpload() {
  const timestamp = new Date().getTime();
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    'Wj4Bp15zZGPnUe11gQHfsviAFNM'
  );
  return { timestamp, signature };
}

router.post('/cropImage', async (req, res) => {
  try {
    // Getting needed params
    const { imageLink, crop } = req.body;
    const outputFilePath = 'cropOutput.jpg';
    const originalFilePath = 'cropFile.jpg';
    // Downloading image from cloudinary
    await downloadImage(imageLink, originalFilePath);
    const originalFile = await sharp(originalFilePath);
    // Getting original width and height to calculate crops dimensions
    const { width, height } = await originalFile.metadata();
    // Converting % into pixels for Crop
    const cropParams = convertCropToPx(height, width, crop);

    // Cropping image and saving it
    await originalFile.extract(cropParams).toFile(outputFilePath);
    // Downloading new image on a server and returning URL to the FE
    const croppedUrl = await uploadImage(outputFilePath);
    // Deleting unnecessary files
    await fs.unlink(outputFilePath, () => {
    });
    await fs.unlink(originalFilePath, () => {
    });

    res.status(200).json(croppedUrl);
  } catch (e) {
    console.log('Crop failed', e);
    res.status(500).json({ message: 'Failed to crop it', e });
  }
});

router.post('/uploadImage', saveImageToLocal.single('file'), async (req, res) => {
  try {
    const newImageUrl = await uploadImage('images/temporaryImage.jpg');
    await fs.unlink('images/temporaryImage.jpg', () => {
      console.log('Item deleted');
    });
    res.status(200).json({ message: 'Everything is OK', url: newImageUrl });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Failed to upload new image', e });
  }
});

module.exports = router;
