const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  update_flag:{type:String},
  latest_version: {type:String},
  versionCode: {type: Number},
  minVersionCode:{type: Number},
  notes: {type: String},
  update_url:{type: String},
  done_update_Usernum:{type: String},
})

module.exports = mongoose.model('Version', schema)