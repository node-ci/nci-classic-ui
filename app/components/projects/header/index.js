'use strict';

var React = require('react'),
	ProjectActions = require('../../../actions/project'),
	template = require('./index.jade'),
	CommonComponents = require('../../common');

module.exports = React.createClass({
	onBuildProject: function() {
		if (this.props.project.name) {
			ProjectActions.run(this.props.project.name);
		}
	},
	render: template.locals({
		Scm: CommonComponents.Scm
	})
});
