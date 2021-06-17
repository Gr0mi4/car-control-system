const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  id: {type: Number, required: true, unique: true},
  brand: {type: String, required: true},
  model: {type: String, required: true},
  type: {type: String, required: true},
  status: {type: String, required: true},
})

module.exports = model('Vehicle', schema)
