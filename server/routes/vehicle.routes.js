const cloudinary = require('cloudinary');
const { Router } = require('express');

const Vehicle = require('../models/Vehicle');

const router = Router();

router.post('/getUserVehicles', async (req, res) => {
  try {
    const { userId } = req.body;
    const userVehicles = await Vehicle.find({ userId: userId });
    if (userVehicles.length > 0) {
      res.status(200).json(userVehicles);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'User vehicles can not be retrieved', e });
  }
});

router.post('/getVehicleInfo', async (req, res) => {
  try {
    const { vehicleId } = req.body;
    const vehicle = await Vehicle.findOne({ _id: vehicleId });
    if (vehicle) {
      res.status(200).json(vehicle);
    } else {
      res.status(201).json({ message: 'Vehicle not found' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Vehicle data can not be retrieved' });
  }
});

router.post('/changeVehicleProp', async (req, res) => {
  try {
    const { vehicleId, updatedField, newValue } = req.body;
    const vehicle = await Vehicle.findOne({ _id: vehicleId });

    if (vehicle[updatedField] !== undefined) {
      vehicle[updatedField] = newValue;
    } else {
      if (!vehicle.additionalFields) {
        vehicle.additionalFields = {};
      }
      vehicle.additionalFields[updatedField] = newValue;
    }
    const updatedVehicle = await Vehicle.updateOne({ _id: vehicleId }, vehicle);

    if (!vehicle) {
      res.status(500).json({ message: 'Such vehicle not found' });
    }

    if (!updatedVehicle) {
      res.status(500).json({ message: 'Can`t be updated' });
    }

    if (updatedVehicle) {
      res.status(200).json(vehicle);
    }

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Vehicle property was not changed' });
  }
});

router.post('/deleteCustomField', async (req, res) => {
  try {
    const { vehicleId, fieldName } = req.body;
    const vehicle = await Vehicle.findOne({ _id: vehicleId });
    if (vehicle.additionalFields[fieldName]) {
      delete vehicle.additionalFields[fieldName];
      await Vehicle.replaceOne({ _id: vehicleId }, vehicle);
      res.status(200).json(vehicle);
    } else {
      res.status(500).json('Something went wrong');
    }
  } catch (e) {
    console.log(e);
  }
});

router.post('/saveNewVehicle', async (req, res) => {
  try {
    const { brand, model, modification, type, userId, image } = req.body;
    const vehicle = new Vehicle({ brand, model, modification, type, userId, image });
    await vehicle.save();
    res.status(201).json({ message: 'Vehicle created successfully' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Vehicle was not saved' });
  }
});

router.post('/deleteVehicle', async (req, res) => {
  try {
    const { id } = req.body;
    const deletedVehicle = await Vehicle.deleteOne({ _id: id });
    if (deletedVehicle) {
      res.status(200).json(deletedVehicle);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Vehicle was not deleted' });
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

module.exports = router;
