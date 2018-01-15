var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
	
  var redis = require("redis"),
  client = redis.createClient();

  client.hgetall('heroes', function(err, heroes) {
  		var temp = JSON.parse(heroes.heroes);
  		
  		temp.forEach(function(hero){
  			
  			if (hero.id == req.query.id) {
  				res.send(hero);
  			}
  		})
  		client.quit();
  })

});

module.exports = router;
