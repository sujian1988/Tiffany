const mongoose = require('mongoose')

const schema = new mongoose.Schema({

  xcomment_id:{type: String},
  circle_id:{type: String},
  user_name: { type: String },
  user_id: {
    type: String,
    ref: 'User'
  },
  user_headimg: {type: String},
  xcomment: {type: String},
  xcomment_reply_id:{type: String}, //无用
  reply_user_id: {type: String},
  reply_user_name: { type: String },
  reply_comment: {type: String},
  other_up: {
    type: Number,
    default : 0
  },
  create_time: { type: Date, default: Date.now },
  xcomment_type: {type: Number}, //1是发表视频评论，2 是回复用户评论

  
})


module.exports = mongoose.model('Xcomment', schema)