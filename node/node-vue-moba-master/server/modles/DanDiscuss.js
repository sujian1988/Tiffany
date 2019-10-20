const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  video_id: { type: String },
  c: { type: String },
  m: { type: String }
})

module.exports = mongoose.model('DanDiscuss', schema)