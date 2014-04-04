var express = require('express');
var path = require('path');
var engines = require('consolidate');

exports.configureExpress = function(app) {
	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.engine('html', engines.mustache);
	app.set('view engine', 'html');
	app.use(express.compress());
	app.set('json spaces', 0);
	app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}
};
