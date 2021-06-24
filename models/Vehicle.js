const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  brand: {type: String, required: true},
  model: {type: String, required: true},
  type: {type: String, required: true},
  complectation: {type: String, required: false},
})

module.exports = model('Vehicle', schema)
