var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let name = (req.user ? req.user.firstName : "non loggato");
  res.render('home', { name: name, layout: 'main' });
});

module.exports = router;

