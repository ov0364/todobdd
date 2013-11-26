define(['jquery'], function($){
	function DescribeTodoApp (app) {
		return function(){
			describe("No Todos", function(){
				Given(function(){
				});
				When(function(){
					app.start();
				});
				Then("should show the title todos", function(){
					return $('#container header h1').text() === 'todos';
				});
				And(function(){
					return $('#container input:visible').length === 1;
				});
				afterEach(function () {
					app.stop();
					localStorage.clear();						
				});
			});

		};
	}

	return DescribeTodoApp;
});