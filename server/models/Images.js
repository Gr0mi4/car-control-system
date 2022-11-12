const { Schema, model } = require('mongoose');

const schema = new Schema({
  src: { type: String, required: true },
  vehicleId: { type: String, required: true },
  date: { type: String, required: false },
  name: { type: String, required: false },
});

module.exports = model('Images', schema);
