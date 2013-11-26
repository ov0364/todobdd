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
					expect($('#container header h1').text()).toEqual('todos');
				});
				it("should show an input field", function(){
					expect($('#container input:visible').length).toEqual(1);
				});
			});
			
			describe("New Todo", function(){
				it("should add 'my todo item'", function(){
					$("#container input:first").val("my todo item");
					var e = $.Event("keypress");
					e.which = 13; // # Some key code value
					$("#container input:first").trigger(e);
				
					expect($("#container #main ul li:last label").text()).toEqual("my todo item");
				});
				
			});
		};
	}
	return DescribeTodoApp;
});