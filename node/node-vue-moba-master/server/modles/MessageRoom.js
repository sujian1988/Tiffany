const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  room_id: {type: String},
  user_id: {
    type: String,
    index: true,
  },
  user_name: { type: String },
  user_mobile: {type: String},
  user_headimg: {type: String},
  send_user_name: { type: String },
  send_user_id: {type: String},
  send_user_headimg: {type: String},
  message_room_id : {type: String},
  create_time: { type: Date, default: Date.now },

})

module.exports = mongoose.model('MessageRoom', schema)