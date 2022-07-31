const {Router} = require('express')

const Vehicle = require('../models/Vehicle')

const router = Router()

router.post('/getUserVehicles', async (req, res) => {
  try {
    const {userId} = req.body
    const userVehicles = await Vehicle.find({userId: userId})
    if (userVehicles.length > 0) {
      res.status(200).json(userVehicles)
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Something went wrong'})
  }
})

router.post('/getVehicleInfo', async (req, res) => {
  try {
    const {vehicleId} = req.body
    const vehicle = await Vehicle.findOne({_id: vehicleId})
    if (vehicle) {
      res.status(200).json(vehicle)
    } else {
      res.status(201).json({message: 'Vehicle not found'})
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Something went wrong'})
  }
})

router.patch('/changeVehicleProp', async (req, res) => {
  try {
    const {vehicleId, updatedField, newValue} = req.body
    const vehicle = await Vehicle.findOne({_id: vehicleId})
    vehicle[updatedField] = newValue
    const updatedVehicle = await Vehicle.updateOne({_id: vehicleId}, vehicle)

    if (!vehicle) {
      res.status(500).json({message: 'Such vehicle not found'})
    }

    if (!updatedVehicle) {
      res.status(500).json({message: 'Cant be updated'})
    }

    if (updatedVehicle) {
      res.status(200).json(vehicle)
    }


  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Something went wrong'})
  }
})

router.post('/saveNewVehicle', async (req, res) => {
  try {
    const {brand, model, modification, type, userId} = req.body
    const vehicle = new Vehicle({brand, model, modification, type, userId})
    await vehicle.save()
    res.status(201).json({message: 'Vehicle created successfully'})
  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Something went wrong'})
  }
})

module.exports = router
