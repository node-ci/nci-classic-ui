'use strict';

var React = require('react'),
	Router = require('react-router'),
	Reflux = require('reflux'),
	CommonComponents = require('../../common'),
	ProjectActions = require('../../../actions/project'),
	projectsStore = require('../../../stores/projects'),
	template = require('./index.jade');

module.exports = React.createClass({
	mixins: [Reflux.ListenerMixin, Router.Navigation],
	componentDidMount: function() {
		this.listenTo(projectsStore, this.updateItems);

		document.body.addEventListener('click', this.onBodyClick);
	},
	componentWillUnmount: function() {
		document.body.removeEventListener('click', this.onBodyClick);
	},
	getInitialState: function() {
		return {
			opened: false,
			searchQuery: ''
		};
	},
	selectorRef: function(ref) {
		this.selectorElement = ref;
	},
	inputRef: function(input) {
		if (input) input.focus();
	},
	selectProject: function(name) {
		this.transitionTo('project', {name: name});
		this.setState({opened: false});
	},
	runProject: function(name) {
		ProjectActions.run(name);
		this.setState({opened: false});
	},
	updateItems: function(projects) {
		this.setState({projects: projects});
	},
	onBodyClick: function(event) {
		if (!this.selectorElement.contains(event.target)) {
			this.setState({opened: false});
		}
	},
	onPreviewClick: function() {
		this.setState({opened: true});
	},
	onQueryChange: function(event) {
		var query = event.target.value;
		this.setState({searchQuery: query});
		ProjectActions.readAll({nameQuery: query});
	},
	render: template.locals({
		Link: Router.Link,
		Scm: CommonComponents.Scm
	})
});
