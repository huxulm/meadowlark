var express = require('express');

var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});

var fortune = require('./lib/fortune');
var app = express();

// 设置视图引擎
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// 设置端口
app.set('port', process.env.PORT || 8125);

// 设置环境属性 production or test
// app.set('env', 'test');
// app.set('env', 'production');
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    // 非生产环境并且请求参数中test=1
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.get('/', function(req, res){
    res.render('layouts/home', {fortuneCookie: fortune.getFortune()});
});

app.get('/about', function(req, res){
	res.render('layouts/about');
});

// 404 page
app.use(function(req, res){
	res.status(404);
	res.render('layouts/404');
});

// 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.send('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http:localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});