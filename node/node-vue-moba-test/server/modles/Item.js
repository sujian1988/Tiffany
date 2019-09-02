const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {type: String},
    icon: {type: String},
    //todo 添加更多字段
})

module.exports = mongoose.model('Item', schema)