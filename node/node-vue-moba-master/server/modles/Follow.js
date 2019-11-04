const mongoose = require('mongoose')

//	@AutoIncKey
const schema = new mongoose.Schema({
  mfollow_id: {type: String},
  user_id: {
    type: String,
    index: true,
  },
  user_name: { type: String },
  user_mobile: {type: String},
  user_type: {type: String},
  user_headimg: {type: String},
  follow_user_id: {type: String},

})

module.exports = mongoose.model('Follow', schema)