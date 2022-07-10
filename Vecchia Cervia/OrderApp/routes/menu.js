var express = require('express');
var router = express.Router();
var db = require('../models/db');


router.get('/', async function(req, res, next) {
  let pizze = await db.Pizza.findAll({include: [{model: db.Ingredient, attributes: ['name']}]});
  pizze.map(pizze => pizze.get({ plain: true }))
  console.log(pizze);
  console.log(pizze[0].ingredients);
  res.render('menu', {layout: "main", pizze: pizze});
});

module.exports = router;

