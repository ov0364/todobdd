define(["loader", "mutation-summary", "jquery"], function (Loader, MutationSummary, $) {
    describe("MVC TODO", function () {
		var observer, summaries = [];
		beforeEach(function(){
		
			function handleChanges (summary) {
				console.log("summary", summary);
				summaries.push(summary);
			}
			
			observer = new MutationSummary({
			  callback: handleChanges, // required
			  rootNode: $('body').get()[0], // optional, defaults to window.document
			  queries: [
				{all : true}
			  ]
			});	
		});
		afterEach(function(){
			observer.disconnect();
			summaries = [];
		});

        it("Render APP", function() {
			// Given
			
			// When
			Loader.open();

			// Then
			waitsFor(function(){
				return summaries.length > 0;
			}, "the app is rendered.", 1000);
			runs(function(){
				// Check for the dom manipulation.
				/*
					<section id="todoapp">
						<header id="header">
							<h1>todos</h1>
							<input autofocus="" placeholder="What needs to be done?" id="new-todo">
						</header>
					</section>				
				*/
				// I should know I'm on the todos app.
				expect(summaries).toHave('<h1>todos</h1>');
				
				// I should see a box that can add todos.
				expect(summeries).toHave('<input>');
				
				// The focus should be on the box. Use the dom for this? Can we ask for the focus element.
				expect(summaries).toHave('<input autofocus="">');
				
				// It should tell me that I can add todos inside the box.
				expect(summaries).toHave('<input placeholder="What needs to be done?">')
				
			})
        });

    });
});