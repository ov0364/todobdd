define(['jquery'], function($){
		
		var baseUrl = "/app/alpha/js";
		var deferred = new $.Deferred();

		require.config({
			paths : {
				"alpha" : baseUrl
			}
		});
		
		require([
			'alpha/views/app',
			'alpha/routers/router',
			'jquery'
		], function( AppView, Workspace, $ ){
			var fn = {
				"start" : function(){
					$('#container').append('<section id="todoapp"/>');

					// Initialize routing and start Backbone.history()
					workspace = new Workspace();
					Backbone.history.start();

					// Initialize the application view
					appView = new AppView();			
				},
				"stop" : function(){
					Backbone.history.stop();
					appView.remove();
					appView.unbind();
				}
			};
			deferred.resolve(fn);
		});
		
		return deferred.promise();
});