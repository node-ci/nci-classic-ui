'use strict';

define([
	'socketio', 'dataio', 'config'
], function(socketio, dataio, config) {
	// Do it because we use connect in console store
	return dataio(socketio.connect(config.http.ws || config.http.url));
});
