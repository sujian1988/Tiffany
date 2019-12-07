const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  
  video_id: {type: String},
  user_name: { type: String },
  user_headimg:{type: String},
  user_id: {type: String},
  bg_img : {type: String},
  sign_text : {type : String},
  title:{type: String},
  comment: {type: Number},
  user_type: {type: String},
  top_commentsVoiceuri: {type: String},
  up: {type: Number},
  down: {type: Number},
  forward: {type: Number},
  image: {type: String},
  share_status: {type: String},
  gif: {type: String},
  thumbnail: {type: String},
  video: {type:String},
  video_type : {type : String},
  video_screen_type : {type : Number},
  duration_Time: {type: Number},
  create_time: { type: Date, default: Date.now },
  looknum : {type: Number},   //观看次数
  danmunum : {type: Number},  //弹幕数
  sharenum : {type: Number},   //分享次数
  collectnum : {type: Number},   //收藏次数


})

module.exports = mongoose.model('Video', schema)