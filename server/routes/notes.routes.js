const { Router } = require('express');

const Notes = require('../models/Note');

const router = Router();

router.post('/getVehicleNotes', async (req, res) => {
  try {
    const { vehicleId } = req.body;
    const vehicleNotes = await Notes.find({ vehicleId });
    if (vehicleNotes.length > 0) {
      res.status(200).json(vehicleNotes);
    } else {
      res.status(200).json([]);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json('Something went wrong');
  }
});

router.post('/addNote', async (req, res) => {
  try {
    const { vehicleId, text, name } = req.body;
    const note = new Notes({ vehicleId, text, name, date: new Date().getTime() });
    await note.save();
    res.status(201).json({ message: 'Note created' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/deleteNote', async (req, res) => {
  try {
    const { id } = req.body;
    await Notes.deleteOne({ _id: id });
    res.status(201).json({ message: 'Note created' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/changeNote', async (req, res) => {
  try {
    const { id, text, name } = req.body;
    const note = await Notes.findOne({ _id: id });
    note.text = text;
    note.name = name;
    const updatedNote = await Notes.updateOne({ _id: id }, note);

    if (!note) {
      res.status(500).json({ message: 'Such vehicle not found' });
    }

    if (!updatedNote) {
      res.status(500).json({ message: 'Can`t be updated' });
    }

    if (updatedNote) {
      res.status(200).json(note);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
