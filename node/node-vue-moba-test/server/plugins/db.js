module.exports = app =>{

    const mongoose = require("mongoose")
    mongoose.connect('mongodb://localhost:27017/node-vue-moba',{

        useNewUrlParser: true

    })

    //     //连接成功
    // mongoose.connection('connected',()=>{
    //     console.log('connect success!');
    // })
    // //连接失败
    // mongoose.connection('error',(err)=>{
    //     console.log('connect error,'+err);
    // })
    // //连接断开
    // mongoose.connection('disconnected',()=>{
    //     console.log('connect disconnected');
    // })


}