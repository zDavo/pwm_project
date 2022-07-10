var express = require('express');
var router = express.Router();
var passport = require('passport');
const argon2 = require('argon2');
const db = require('../models/db');

/* GET Login Index page. */
router.get('/', function(req, res) {
	
});


router.get('/logout', function(req, res) {
	req.logout();
	res.redirect("/");
});

/* POST Validate the user login */

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
    	return res.send('KO');
    }
    req.login(user, function(err) {
      console.log(err);
      return res.send('OK');
    });
  })(req, res, next);
});




module.exports = router;
