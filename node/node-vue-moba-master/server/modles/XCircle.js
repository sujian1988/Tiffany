const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  
  circle_id: {type: String},
  user_name: { type: String },
  user_headimg:{type: String},
  user_id: {type: String},
  title:{type: String},
  comment: {type: Number},
  user_type: {type: String},
  top_commentsVoiceuri: {type: String},
  up: {type: Number},
  down: {type: Number},
  forward: {type: Number},
  image: {type: String},
  share_status: {type: String},
  thumbnail: {type: String},
  duration_Time: {type: Number},
  create_time: { type: Date, default: Date.now },


})

module.exports = mongoose.model('Xcircle', schema)