'use strict';

var _ = require('underscore'),
	fs = require('fs'),
	path = require('path'),
	env = process.env.NODE_ENV || 'development',
	jade = require('jade');

var templatePath = __dirname + '/views/index.jade',
	template = fs.readFileSync(templatePath),
	indexTemplate = jade.compile(template, {
		filename: templatePath
	});

exports.register = function(oiginalApp) {
	var app = _(oiginalApp).clone(),
		staticPath = path.join(__dirname, 'static'),
		socketio = require('socket.io')(app.httpServer);
	
	app.dataio = require('./dataio')(socketio);

	// init resources
	require('./resources')(app);

	console.log('');

	// serve index for all app pages, add this listener after all other
	// listeners
	app.httpServer.addRequestListener(function(req, res, next) {
		console.log(1234);
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
