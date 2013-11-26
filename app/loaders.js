define(['jquery'], function($){
	
	function loader (name) {
		var baseUrl = "/app/" + name + "/js",
			deferred = new $.Deferred(),
			paths = {};
		
		if (name === 'empty') {
			deferred.resolve({start:function(){},stop:function(){}});
		} else {
			paths[name] = baseUrl;
			
			require({
				paths : paths
			},[
				name + '/views/app',
				name + '/routers/router',
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
		}
		return {name : name, promise : deferred.promise()};
	}
	
	var apps = ['empty', 'alpha_bug_1', 'alpha_bug_2', 'alpha_bug_3', 'alpha', 'beta', 'final'],
		i, iSize, loaders = [];
	for (i = 0, iSize = apps.length; i < iSize; i = i + 1){
		loaders.push(loader(apps[i]));
	}
	
	return loaders;
});
