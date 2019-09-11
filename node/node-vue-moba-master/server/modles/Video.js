const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  
  user_name: { type: String },
  user_id: {type: String},
  title:{type: String},
  comment: {type: Number},
  user_type: {type: String},
  user_headimg: {type: String},
  top_commentsVoiceuri: {type: String},
  up: {type: Number},
  down: {type: Number},
  forward: {type: Number},
  image: {type: String},
  share_status: {type: String},
  gif: {type: String},
  thumbnail: {type: String},
  video: {type:String},

})

module.exports = mongoose.model('Video', schema)