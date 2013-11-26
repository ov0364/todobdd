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
        },
		'mutation-summary': {
			exports: 'MutationSummary'
		}
	},
	paths: {
		jquery: '../../../assets/jquery.min',
		underscore: '../../../assets/lodash.min',
		backbone: 'lib/backbone/backbone',
		backboneLocalstorage: 'lib/backbone/backbone.localStorage',
		text: 'lib/require/text',
		spec: 'spec',
		'jasmine': '../../../assets/jasmine-1.3.1/jasmine',
		'jasmine-html': '../../../assets/jasmine-1.3.1/jasmine-html',
		'mutation-summary': '../../../assets/mutation-summary'
	}
});

require([
	'loader',
	'jquery',
	'jasmine-html',
	'mutation-summary'
], function( Loader, $, jasmine, MutationSummary ) {

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
		var appView, workspace, observer;
		
		$("#loadApp").click(function(){
			Loader.open();
		});
		
		$("#clearLocalStorage").click(function(){
			Loader.clearLocalStorage();
		});	
		
		$("#removeApp").click(function(){
			Loader.close();
		});
		
		$("#startMutationSummary").click(function(){
			function hasParentNode(list, node, index) {
				var i, iSize;
				for (i = 0; i < list.length; i = i + 1) {
					if (list[i] === node.parentNode) {
						return true;
					}
				}
				return false;
			}
			
			function handleChanges (summary) {
				console.log("summary", summary);
				
				for (var item in summary[0]) {
					console.log(item);
					if (Array.isArray(summary[0][item])) {
						var i, iSize;
						for (i = 0, iSize = summary[0][item].length; i < iSize; i = i + 1) {
							if (!hasParentNode(summary[0][item], summary[0][item][i], i)) {
								console.log("summary clone : ", {node:summary[0][item][i].cloneNode(true)});
							}
						}
					}
				}
			}
			observer = new MutationSummary({
			  callback: handleChanges, // required
			  rootNode: $('body').get()[0], // optional, defaults to window.document
			  queries: [
				{all : true}
			  ]
			});				
		});
		
		$("#stopMutationSummary").click(function(){
			var summaries = observer.disconnect();
			console.log("summaries", summaries);
		});
		
		$("#jasmine").click(function(){
			require(specs, function (spec) {
				jasmineEnv.execute();
			});		
		});
		
		$("#demo").click(function(){
			var $App = $("#todoapp").clone();
			var $Added = $(".added");
			if ($Added.data("insertion") === "append") {
				$App.append($Added.html());
			}
			$("#then").append($App);
		});
		
		
		
		$(".element").mouseenter(function(){
			console.log(this);
			$("#" + $(this).text()).addClass("highlight");
		}).mouseleave(function(){
			$("#" + $(this).text()).removeClass("highlight");
		});
	});
});
