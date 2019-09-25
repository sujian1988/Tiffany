const mongoose = require('mongoose')

//无用类 为了解决vue-cli-service build nnot find module '../modles/Life' Require stack: -这个bug
const schema = new mongoose.Schema({
  
    mliveId: {type: String},
 
	


})

module.exports = mongoose.model('Life', schema)