const mongoose = require('mongoose')

//	@AutoIncKey 
const schema = new mongoose.Schema({
  message_id: {type: String},
  user_id: {
    type: String,
    index: true,
  },
  user_name: { type: String },
  user_mobile: {type: String},
  user_headimg: {type: String},
  message: {type: String},
  message_type: {type: String},
  room_id : {type: String},
  create_time: { type: Date, default: Date.now },

})

module.exports = mongoose.model('Message', schema)