var express = require('express');
var router = express.Router();
// (internal/modules/cjs/loader.js:625:15)报这个错是因为user类名小写了！！
var User = require('../modules').User;

/* GET users listing. */
router.get('/login', function(req, res, next) {
  //res.send('respond with a resource');
  var account = req.query.account;
  var password = req.query.password;
  if(account != undefined && account != null &&
    password != undefined && password != null ){
    return res.json({code:0, msg:'success', users:{account: account }});
  }else{
    return res.json({code:2, msg:'fail', users:{account: account }});
  }
});

router.post('/login', function(req, res, next) {
  //res.send('respond with a resource');
  var account = req.query.account;
  var password = req.query.password;
  if(account != undefined && account != null &&
    password != undefined && password != null ){
    return res.json({code:0, msg:'success', users:{account: account }});
  }else{
    return res.json({code:2, msg:'fail', users:{account: account }});
  }
});

//注意这里要从body里获取参数，请求是就应该将参数放入body中
//如何使从queryh里获取参数，那参数就应该拼接在url请求后面
router.post('/register', function(req, res, next) {
  //res.send('respond with a resource');

  if(req.body.account === undefined || req.body.account === null ||
    req.body.password === undefined || req.body.password === null ){
    return res.json({code:100, msg:'account is null'});
  }

  //数据库增删改查
  var user = {
    account : req.body.account, 
    password : req.body.password
  };
  User.create(user).then(function(){
    return res.json({code:0, msg:'success', user:{account: req.body.account }});
  });

});


router.get('/vip', function(req, res, next) {
  //res.send('respond with a resource');
  return res.json({code:0, msg:'success vip'});
});

module.exports = router;