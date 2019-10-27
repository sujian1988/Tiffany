const mongoose = require('mongoose')

const schema = new mongoose.Schema({

  xcomment_reply_id:{type: String},
  circle_id:{type: String},
  user_name: { type: String },
  user_headimg: {type: String},
  reply_user_id: {type: String},
  reply_user_name: { type: String },
  reply_xcomment: {type: String},
  create_time: { type: Date, default: Date.now },
 
})

module.exports = mongoose.model('Xcommentreplyitem', schema)