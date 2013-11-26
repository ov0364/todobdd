define([
	'views/app',
	'routers/router',
	'jquery',
	], function( AppView, Workspace, $ ){
		var fn = {
			"open" : function(){
				$('body').append('<section id="todoapp"/>');

				// Initialize routing and start Backbone.history()
				workspace = new Workspace();
				Backbone.history.start();

				// Initialize the application view
				appView = new AppView();			
			},
			"close" : function(){
				Backbone.history.stop();
				appView.remove();
				appView.unbind();
			},
			"clearLocalStorage" : function(){
				localStorage.clear();
			}
		};
		return fn;
});