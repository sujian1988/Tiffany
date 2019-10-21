
module.exports = app => {

  const mongoose = require("mongoose")

  //  mongoose.connect('mongodb://localhost:27017/node-vue-moba',{ 
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {useNewUrlParser: true})

  require('require-all')(__dirname + '/../modles')
}