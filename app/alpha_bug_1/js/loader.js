define(['jquery'], function($){
		
		var baseUrl = "/app/alpha_bug_1/js";
		var deferred = new $.Deferred();
		
		require({
			paths : {
				"alpha_bug_1" : baseUrl
			}
		},[
			'alpha_bug_1/views/app',
			'alpha_bug_1/routers/router',
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