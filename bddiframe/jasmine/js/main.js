var basePath = "../../../",
	projectPath = basePath + "bddiframe/jasmine/";

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
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
		},
		jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
	},
	paths: {
		backbone: basePath + 'assets/backbone/backbone',
		backboneLocalstorage: basePath + 'assets/backbone/backbone.localStorage',
		text: basePath + 'assets/require/text',		
		jquery: basePath + 'assets/jquery.min',
		underscore: basePath + 'assets/lodash.min',
		'jasmine': basePath + 'assets/jasmine-1.3.1/jasmine',
		'jasmine-html': basePath + 'assets/jasmine-1.3.1/jasmine-html',
		'spec': projectPath + 'spec'
	}
});

require([
	'jquery',
	'jasmine-html'
], function( $, jasmine ) {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
    
    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push('spec/todoapp');

	$(function() {
		require(specs, function (spec) {

			var i, iSize, apps = ["jquery", "emberjs", "angularjs", "canjs", "knockoutjs", "backbone"];
			for (i = 0, iSize = apps.length; i < iSize; i = i + 1){
				describe("Todo " + apps[i] + " App", new spec(apps[i]));
			}
			jasmineEnv.execute();
			
		});		
	});
});
