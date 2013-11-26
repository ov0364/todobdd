define(['jquery'], function($parent){
	function TodosPageObject(){
		
		var document = $parent('iframe')[0].contentWindow.document,
		$ = $parent('iframe')[0].contentWindow.$;
		
		this.add = function(todo){
			$('input#new-todo').val(todo);
			
		    // dispatch for firefox + others
		    var eChange = doc.createEvent("HTMLEvents");
		    eChange.initEvent('change', true, true ); // event type,bubbling,cancelable
		    document.getElementById('new-todo').dispatchEvent(eChange);

			// Create new event
			var eEnterDown = doc.createEvent('KeyboardEvent');
			// Init key event
			eEnterDown.initKeyEvent('keydown', true, true, window, false, false, false, false, 13, 0);
			// Dispatch event into document
			document.getElementById('new-todo').dispatchEvent(eEnterDown);						
			
			
			// Create new event
			var eEnterUp = doc.createEvent('KeyboardEvent');
			// Init key event
			eEnterUp.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
			// Dispatch event into document
			document.getElementById('new-todo').dispatchEvent(eEnterUp);			    
		};
	}
	
	function DescribeTodoApp (app) {
		return function(){
			var $, todosPageObject;
			
			beforeEach(function(){
				$parent('body').append('<iframe src="/architecture-examples/' + app + '"></iframe>');
			
				waitsFor(function(){
					return typeof $parent('iframe')[0].contentWindow.$ !== "undefined";
				}, 'iframe is loaded', 5000);
				waits(5000);
				runs(function(){
					doc = $parent('iframe')[0].contentWindow.document;
					$ = $parent('iframe')[0].contentWindow.$;
					todosPageObject = new TodosPageObject();
				});
			});
			afterEach(function(){
				$parent('iframe').remove();
				localStorage.clear();
				$ = undefined;
				todoPageObject = undefined;
			});		
			describe("No Todos", function(){
				it("should show the title todos", function(){
					expect($('header h1').text()).toEqual('todos');
				});
				it("should show an input field", function(){
					expect($('input:visible').length).toEqual(1);
				});
			});
			
			describe("New Todo", function(){
				it("should add 'my todo item'", function(){
					todosPageObject.add("my todo item");
					
					expect($("#main ul li:last label").text()).toEqual("my todo item");
				});
			});
		};
	}
	return DescribeTodoApp;
});