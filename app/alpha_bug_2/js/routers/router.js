define([
	'jquery',
	'backbone',
	'alpha_bug_2/collections/todos',
	'alpha_bug_2/common'
], function( $, Backbone, Todos, Common ) {

	var Workspace = Backbone.Router.extend({
		routes:{
			'*filter': 'setFilter'
		},

		setFilter: function( param ) {
			// Set the current filter to be used
			Common.TodoFilter = param.trim() || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of the Todo view items
			Todos.trigger('filter');
		}
	});

	return Workspace;
});
