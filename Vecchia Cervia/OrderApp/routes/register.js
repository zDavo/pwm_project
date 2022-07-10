var express = require('express');
var router = express.Router();
const argon2 = require('argon2');
const db = require('../models/db');

/* GET home page. */
router.get('/', function(req, res, next) {
 	res.render('index', { title: 'Express' });
});

router.post('/', async function(req, res){
	db.User.create({
	    email: req.body.email,
	    firstName: req.body.firstName,
	    lastName: req.body.lastName,
	    password: await argon2.hash(req.body.password)
	  }).then((u)=>{
	  		res.send("OK");
	  }).catch((e)=>{
	  		console.log(e);
	  		if(e.errors[0].path == "email")
	  			res.send("KO-Email");
	  		else
	  			res.send("KO");
	  });

});




module.exports = router;

