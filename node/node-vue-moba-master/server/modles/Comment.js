const mongoose = require('mongoose')


const schema = new mongoose.Schema({

  video_id:{type: String},
  user_name: { type: String },
  user_id: {type: String},
  user_headimg: {type: String},
  comment: {type: String},
  other_up: {type: Number},
  

})

module.exports = mongoose.model('Comment', schema)