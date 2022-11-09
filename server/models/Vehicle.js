const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String, required: true },
  modification: { type: String, required: false },
  userId: { type: String, required: true },
  image: { type: String, required: false },
  additionalFields: { type: Object, required: false },
});

module.exports = model('Vehicle', schema);
