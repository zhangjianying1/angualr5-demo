var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var sess = req.session//用这个属性获取session中保存的数据，而且返回的JSON数据
	if (sess.views) {
	    sess.views++
	    req.session.save();
	} else {
	    sess.views = 1
	    req.session.save();
	}
	  
	console.log(sess.views)
	var redis = require("redis"),
	client = redis.createClient();
	
	client.hgetall('heroes', function(err, heroes) {
		  res.send(heroes.heroes);
		  client.quit();
	})
	   	
});

module.exports = router;
