var express = require('express');
var http = require('http');
var app = express();

require('./configuration').configureExpress(app);
require('./routeConfiguration').defineRoutes(app);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
