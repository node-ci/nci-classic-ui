'use strict';

var React = require('react'),
	BuildActions = require('../../actions/build'),
	BuildsList = require('../builds/list'),
	template = require('./index.jade');

module.exports = React.createClass({
	componentWillMount: function() {
		BuildActions.readAll();
	},
	render: template.locals({
		BuildsList: BuildsList
	})
});
