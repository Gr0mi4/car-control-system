const { Schema, model } = require('mongoose');

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // links: [{ type: Types.ObjectId, ref: 'Link'}]
});

module.exports = model('User', schema);
