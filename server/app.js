var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var parseurl = require('parseurl');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
//var redis = require("redis"),
//  client = redis.createClient();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new RedisStore({
	    host: '127.0.0.1',
	    port: '6379'
	}),
    secret: 'keyborad cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    }
}));

//app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: { secure: true}}))

// cross 跨域
app.use(function(req, res, next){

    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, userId, token');
	res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if ('OPTIONS' == req.method) return res.sendStatus(200);
    next();
})

app.use('/index', index);
app.use('/users', users);

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });



//client.set("string key", "string val", redis.print);
//client.hset("hash key", {id:3}, "some value", redis.print);
//client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
//client.hkeys("hash key", function (err, replies) {
//  console.log(replies, " replies:");
//  replies.forEach(function (reply, i) {
//      console.log("    " + i + ": " + reply);
//  });
//  client.quit();
//});
//
//
//var sources = JSON.stringify([
//{ id: 11, name: 'Mr. Nice' },
//{ id: 12, name: 'Narco' },
//{ id: 13, name: 'Bombasto' },
//{ id: 14, name: 'Celeritas' },
//{ id: 15, name: 'Magneta' },
//{ id: 16, name: 'RubberMan' },
//{ id: 17, name: 'Dynama' },
//{ id: 18, name: 'Dr IQ' },
//{ id: 19, name: 'Magma' },
//{ id: 20, name: 'Tornado' }		
//])
//
////写入JavaScript(JSON)对象
//client.hmset('heroes', {heroes: sources}, function(err) {
//console.log(err)
//})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
