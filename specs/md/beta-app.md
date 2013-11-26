## Functionality Beta App

### No todos

When there are no todos, `#main` should be hidden.

### New todo

New todos are entered in the input at the top of the app. Pressing Enter creates the todo, appends it to the todo list and clears the input. Make sure to `.trim()` the input and then check that it's not empty before creating a new todo.

### Item

A todo item has two possible interactions:

1. Double-clicking the `<label>` activates editing mode, by toggling the `.editing` class on it's `<li>`

2. Hovering over the todo shows the remove button (`.destroy`)

### Editing

When editing mode is activated it will hide the other controls and bring forward an input that contains the todo title, which should be focused (`.focus()`). The edit should be saved on both blur and enter, and the `editing` class should be removed. Make sure to `.trim()` the input and then check that it's not empty. If it's empty the todo should instead be destroyed. If escape is pressed during the edit, the edit state should be left and any changes be discarded.

### Persistence

Your app should dynamically persist the todos to localStorage. If the framework has capabilities for persisting data (i.e. Backbone.sync), use that, otherwise vanilla localStorage. If possible, use the keys `id`, `title`, `completed` for each item. Make sure to use this format for the localStorage name: `todos-[framework]`. Editing mode should not be persisted.