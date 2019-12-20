const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  
  circle_id: {type: String},
  user_name: { type: String },
  user_headimg:{type: String},
  user_id: {type: String},
  title:{type: String},
  comment: {type: String},
  user_type: {type: String},
  xiuxiu_type: {type: String},
  top_commentsVoiceuri: {type: String},
  gif: {type : String},
  up: {type: Number},
  share_num:{type : Number},
  chat_num: {type : Number},
  down: {type: Number},
  forward: {type: Number},
  image: {type: String},
  video : {type : String},
  share_status: {type: String},
  thumbnail: {type: String},
  duration_Time: {type: Number},
  create_time: { type: Date, default: Date.now },


})

module.exports = mongoose.model('Xcircle', schema)