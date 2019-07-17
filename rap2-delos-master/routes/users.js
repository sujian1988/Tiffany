var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  //res.send('respond with a resource');
  return res.json({code:0, msg:'success'});
});



router.get('/vip', function(req, res, next) {
  //res.send('respond with a resource');
  return res.json({code:0, msg:'success vip'});
});

module.exports = router;