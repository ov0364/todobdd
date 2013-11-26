define(['jquery'], function($){
	function DescribeTodoApp (app) {
		return function(){
			beforeEach(function(){
				app.start();
			});
			afterEach(function(){
				app.stop();
				localStorage.clear();
			});		
			describe("No Todos", function(){
				it("should show the title todos", function(){
					expect($('#container header h1')).toHaveText('todos');
				});
				it("should show an input field", function(){
					expect($('#container')).toContainHtml('<input id="new-todo" placeholder="What needs to be done?" autofocus="">');
				});
			});
			
			describe("New Todo", function(){
				it("should add 'my todo item'", function(){
					$("#container input:first").val("my todo item");
					var e = $.Event("keypress");
					e.which = 13; // # Some key code value
					$("#container input:first").trigger(e);
				
					expect($("#container #main ul li:last label")).toHaveText("my todo item");
				});
				
			});
		};
	}
	return DescribeTodoApp;
});