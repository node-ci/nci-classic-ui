'use strict';

var _ = require('underscore'),
	fs = require('fs'),
	path = require('path'),
	env = process.env.NODE_ENV || 'development';

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
			if (env === 'development') {
				var jade = require('jade');
				// Compile a function
				var index = jade.compileFile(__dirname + '/views/index.jade');
				res.write(index({env: env}));
				res.end();
			} else {
				fs.createReadStream(path.join(staticPath, 'index.html'))
					.pipe(res);
			}
		} else {
			next();
		}
	});
};
