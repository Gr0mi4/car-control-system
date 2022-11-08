const { Schema, model } = require('mongoose');

const schema = new Schema({
  text: { type: String, required: true },
  vehicleId: { type: String, required: true },
  date: { type: String, required: true },
  name: { type: String, required: false },
});

module.exports = model('Notes', schema);
