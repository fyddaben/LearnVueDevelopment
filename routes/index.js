var express = require('express');
var router = express.Router();
var util = require('./util');

/* GET home page. */
router.get('/', function(req, res, next) {
  var path = util.getStaticPath('index');
  res.render('index', { title: 'Express', path: path});
});

module.exports = router;
