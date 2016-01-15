'use strict';

var _ = require('underscore'),
	fs = require('fs'),
	path = require('path'),
	env = process.env.NODE_ENV || 'development',
	indexTemplate = require('./views/index');

exports.register = function(oiginalApp) {
	var app = _(oiginalApp).clone(),
		staticPath = path.join(__dirname, 'static'),
		socketio = require('socket.io')(app.httpServer);
	
	app.dataio = require('./dataio')(socketio);

	// init resources
	require('./resources')(app);

	// serve index for all app pages, add this listener after all other
	// listeners
	app.httpServer.addRequestListener(function(req, res, next) {
		if (req.url.indexOf('/data.io.js') === -1) {
			var indexHtml = indexTemplate({
				env: env,
				config: {http: _(app.config.http).pick('url', 'ws')}
			});

			res.setHeader('content-type', 'text/html');
			res.end(indexHtml);
		} else {
			next();
		}
	});
};
