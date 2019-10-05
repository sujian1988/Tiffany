const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  update_flag:{type:String},
  latest_version: {type:String},
  notes: {type: String},
  update_url:{type: String},
})

module.exports = mongoose.model('Version', schema)