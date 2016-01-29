'use strict';

define([
	'react', 'reflux',
	'app/actions/project',
	'app/actions/build',
	'app/stores/project',
	'app/components/projects/header/index',
	'app/components/builds/list',
	'templates/app/components/projects/view/index',
	'app/components/common/index'
], function(React, Reflux, ProjectActions, BuildActions,
	projectStore, ProjectHeader, Builds, template, CommonComponents
) {
	template = template.locals({
		ProjectHeader: ProjectHeader,
		Builds: Builds,
		DateTime: CommonComponents.DateTime,
		Duration: CommonComponents.Duration
	});

	return React.createClass({
		mixins: [
			Reflux.connectFilter(projectStore, 'project', function(project) {
				if (project.name === this.props.params.name) {
					return project;
				} else {
					if (this.state) {
						return this.state.project;
					} else {
						return projectStore.getInitialState();
					}
				}
			})
		],
		statics: {
			willTransitionTo: function(transition, params, query) {
				ProjectActions.read({name: params.name});
				BuildActions.readAll({projectName: params.name});
			}
		},
		render: template
	});
});
