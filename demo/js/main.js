// Require.js allows us to configure shortcut alias
require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}		
	},
	paths: {
		backbone: '../../assets/backbone/backbone',
		backboneLocalstorage: '../../assets/backbone/backbone.localStorage',
		text: '../../assets/require/text',		
		jquery: '../../assets/jquery.min',
		underscore: '../../assets/lodash.min'
	}
});
require(['jquery'], function($){

	require({
		paths : {loaders: '../../app/loaders'}
	}, ['loaders'], function(loaders){
		$(document).ready(function(){
			$('#clearLocalstorage').click(function(){
				localStorage.clear();
			});
			var i, iSize, apps = {}, currentApp;
			for (i = 0, iSize = loaders.length; i < iSize; i = i + 1){
				var name = loaders[i].name;
				$('select').append('<option value="' + name + '">' + name + '</option>');
				
				loaders[i].promise.done(function(name){
					return function(app){
						apps[name] = app;
					};
				}(name));		
			}
			
			$('select').change(function(){
				if (currentApp !== undefined) {
					currentApp.stop();
				}
				currentApp = apps[$(this).val()];
				currentApp.start();
			});
	
		});
	});

});

