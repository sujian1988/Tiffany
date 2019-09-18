const mongoose = require('mongoose')


const schema = new mongoose.Schema({

  comment_id:{type: String},
  video_id:{type: String},
  user_name: { type: String },
  user_id: {
    type: String,
    ref: 'User'
  },
  user_headimg: {type: String},
  comment: {type: String},
  reply_user_id: {type: String},
  reply_user_name: { type: String },
  reply_comment: {type: String},
  other_up: {
    type: Number,
    default : 0
  },
  comment_type: {type: Number}, //1是发表视频评论，2 是回复用户评论

  
})

module.exports = mongoose.model('Comment', schema)