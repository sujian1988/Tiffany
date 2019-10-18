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
  comment_reply_id:{type: String},
  reply_user_id: {type: String},
  reply_user_name: { type: String },
  reply_comment: {type: String},
  other_up: {
    type: Number,
    default : 0
  },
  create_time: { type: Date, default: Date.now },
  comment_type: {type: Number}, //1是发表视频评论，2 是回复用户评论

  
})

// let time = '2018-07-03T10:18:58.000Z';
// function formatUTC(utc_datetime) {
//   // 转为正常的时间格式 年-月-日 时:分:秒
//   var T_pos = utc_datetime.indexOf('T');
//   var Z_pos = utc_datetime.indexOf('Z');
//   var year_month_day = utc_datetime.substr(0,T_pos);
//   var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
//   var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

//   // 处理成为时间戳
//   timestamp = new Date(Date.parse(new_datetime));
//   timestamp = timestamp.getTime();
//   timestamp = timestamp/1000;

//   // 增加8个小时，北京时间比utc时间多八个时区
//   var timestamp = timestamp+8*60*60;

//   // 时间戳转为时间
//   var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
//   return beijing_datetime;
// } 
// formatUTC(time); // 2018/7/3 下午6:18:58 


module.exports = mongoose.model('Comment', schema)