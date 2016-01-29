'use strict';

define([
	'react',
	'app/actions/project',
	'templates/app/components/projects/header/index',
	'app/components/common/scm/index'
], function(React, ProjectActions, template, Scm) {
	template = template.locals({
		Scm: Scm
	});

	return React.createClass({
		onBuildProject: function() {
			if (this.props.project.name) {
				ProjectActions.run(this.props.project.name);
			}
		},
		render: template
	});
});
