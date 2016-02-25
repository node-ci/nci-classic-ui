'use strict';

var React = require('react'),
	Router = require('react-router'),
	ProjectsSelector = require('../projects/selector'),
	template = require('./index.jade');

module.exports = React.createClass({
	render: template.locals({
		Link: Router.Link,
		ProjectsSelector: ProjectsSelector
	})
});

