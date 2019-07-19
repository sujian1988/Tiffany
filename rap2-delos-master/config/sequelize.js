var Sequelize = require('sequelize');

exports.sequelize = function(){

    return new Sequelize(
        'dev_xwplay', //数据库的名字 
        'xb2',  // 数据库用户名
        'Sj86624932.',      // 密码
         {'dialect':'mysql',
           host:'39.96.18.249',
           port:3306
        }
    );
    
}