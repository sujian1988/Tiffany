
module.exports = app => {

  var options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };
  const mongoose = require("mongoose")

  //  mongoose.connect('mongodb://localhost:27017/node-vue-moba',{ 
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', options /*{useNewUrlParser: true}*/)

  require('require-all')(__dirname + '/../modles')
}