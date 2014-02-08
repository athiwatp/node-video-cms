var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var serve = require('koa-static');
var koa = require('koa');
var app = koa();

//middleware
app.use(logger());
app.use(serve('./public'));

//route middleware
app.use(route.get('/', home));


function *home() {
	this.body = yield render('home', { 
		projectName: 'Node Video CMS',
		post : 'New post'
	});
}


//listen
app.listen('3000');

