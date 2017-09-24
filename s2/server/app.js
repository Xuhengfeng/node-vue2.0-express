var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); //express web应用框架   默认给我们提供的插件
var bodyParser = require('body-parser');
var ejs = require('ejs');   //ejs 后台htm模板的引擎


//映射后端路由
var index = require('./routes/index');  
var users = require('./routes/users');
var goods = require('./routes/goods');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express) //设置引擎的后缀
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//全局拦截
app.use((req, res, next) => {
	if (req.cookies.userId) {
		next();                  //next() 是往后流转的意思
	} else {
		console.log("url:"+req.originalUrl);
		if (req.originalUrl == '/users/login' || req.originalUrl == '/users/logout') {
			next();
		} else {
			res.json({
				status: '10001',
				msg: '当前未登录',
				result: ''
			});
		}
	}
})





//定义了前端一级路由
app.use('/', index);
app.use('/users', users);
app.use('/goods', goods);



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
