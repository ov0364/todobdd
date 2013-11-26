// Require.js allows us to configure shortcut alias
require.config({
	paths: {
		markdown: '../../assets/markdown.min',		
		jquery: '../../assets/jquery.min'
	}
});
require(['jquery', 'markdown'], function($){
	$(document).ready(function(){
		var i, iSize, apps = ["alpha", "beta", "final"];
		for (i = 0, iSize = apps.length; i < iSize; i = i + 1){
			$.ajax({url:"md/" + apps[i] + "-app.md", async:false}).done(function(app){
				return function(data){
					var $spec = $(
					  	'<div class="row">' +
							'<div class="span1"></div>' +
							'<div class="span5">' + markdown.toHTML(data) + '</div>' +
							'<div class="span5"><iframe src="../template' + app + '" /></div>' +
							'<div class="span1"></div>' +
						'</div>'
					);
					
					$spec.appendTo('.container');
				}
			}(apps[i]));
		}
	});
});

