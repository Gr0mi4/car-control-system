const { Router } = require('express');
const Image = require('../models/Images');
const Notes = require('../models/Note');

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

module.exports = router;
