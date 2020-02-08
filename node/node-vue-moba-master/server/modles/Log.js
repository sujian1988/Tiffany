const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  
  image: { type: String },
  video: { type: String },
  audio: { type: String},
  create_time: { type: Date, default: Date.now },

})

module.exports = mongoose.model('Log', schema)