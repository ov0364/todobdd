## Functionality Alpha App

### No todos

When there are no todos, `#main` should be hidden.

### New todo

New todos are entered in the input at the top of the app. Pressing Enter creates the todo, appends it to the todo list and clears the input. Make sure to `.trim()` the input and then check that it's not empty before creating a new todo.

### Persistence

Your app should dynamically persist the todos to localStorage. If the framework has capabilities for persisting data (i.e. Backbone.sync), use that, otherwise vanilla localStorage. If possible, use the keys `id` and `title` for each item. Make sure to use this format for the localStorage name: `todos-[framework]`.