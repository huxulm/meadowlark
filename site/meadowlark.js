var express = require('express');

var handlebars = require('express3-handlebars')
	.create(
		{
			defaultLayout: 'main',
			// extname: '.hbs',
			helpers: {
				section: function(name, options) {
					if(!this._sections) {
						this._sections = {};
					}
					this._sections[name] = options.fn(this);
					return null;
				}
			}
		}
	);

var fortune = require('./lib/fortune');

var app = express();

/** 
 * 测试浏览器
 */
var httpUtil = require('./lib/HttpUtil');
var http = httpUtil();

// 设置视图引擎
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// 设置端口
app.set('port', process.env.PORT || 8125);

// 设置环境属性 production or test
// app.set('env', 'test');
// app.set('env', 'production');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

app.use(function (req, res, next) {
    // 非生产环境并且请求参数中test=1
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.get('/', function(req, res){
		if (!http.testPage(req, res)) {
			// 如果是测试特定页面
			res.render(
			'layouts/home',
			{
				fortuneCookie: fortune.getFortune(), 
				pageTestScript: '/qa/about-tests.js', 
				reqInfo: http.getReq__(req)
			});
		}
	}
);

app.get('/about', function(req, res){
	res.render('layouts/about');
    // res.json(200, {name: '许令明', age: 20, phone: '18616777015'});
});

app.get('/test', function(req, res){
	res.render('jquerytest');
    // res.json(200, {name: '许令明', age: 20, phone: '18616777015'});
});

app.get('/data/nursery-rhyme', function(req, res) {
	res.json({
		animal: 'basilisk',
		bodyPart: 'tail',
		adjective: 'sharp',
		noun: 'a needle',
	});
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
	res.send('layouts/500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http:localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});