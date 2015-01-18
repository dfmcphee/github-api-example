/*
 * Todo
 */
var todos = {
    /*
    * Adds a new todo
    */
    add: function() {
      var self = this;

      // Get todo content from input
      var content = document.getElementById('new-todo').value;

      // Set url for request
      var url = 'http://localhost:3000/todos/create';

      // Initialize new xhrRequest
      var xhr = null;
      xhr = new XMLHttpRequest();

      // Open and send the request
      xhr.open("POST", url, false);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

      var data = {
        todo: {
          content: content
        }
      };

      xhr.send(JSON.stringify(data));

      // Try to parse response as json object
      try {
        var todo = JSON.parse(xhr.responseText);
      } catch (e) {
        // Output error if response cannot be parsed
        alert('Something went wrong with the request.');
        return false;
      }

      self.render(todo);
    },

    checked: function(e){
      var checkbox = event.target;

      var todo = {
          id: Number(checkbox.getAttribute('data-todo-id')),
          complete: false
      }

      if (checkbox.checked) {
        todo.complete = true;
      }

      todos.update(todo);
    },

    /*
    * Updates a todo
    */
    update: function(todo) {
      // Set url for request
      var url = 'http://localhost:3000/todos/update';

      // Initialize new xhrRequest
      var xhr = null;
      xhr = new XMLHttpRequest();

      // Open and send the request
      xhr.open("POST", url, false);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

      xhr.send(JSON.stringify(todo));
    },

    /*
     * Gets list of todos from the server
     */
    fetch: function() {
        // Set url for request
        var url = 'http://localhost:3000/todos/';

        // Initialize new xhrRequest
        var xhr = null;
        xhr = new XMLHttpRequest();

        // Open and send the request
        xhr.open("GET", url, false);
        xhr.send(null);

        // Try to parse response as json object
        try {
            var todoList = JSON.parse(xhr.responseText);
        } catch (e) {
            // Output error if response cannot be parsed
            alert('Something went wrong with the request.');
        }

        // Render todo list
        this.list(todoList);
    },

    /*
    * Renders a list of todos
    * @param array todoList
    */
    list: function(todoList) {
      // Select todo list element
      var ul = document.getElementById('todo-list');

      // Remove any exisiting list elements
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }

      // Loop through and add a link to each repo
      for (var i=0; i < todoList.length; i++) {
        this.render(todoList[i]);
      }
    },

    /*
     * Renders a todo item
     * @param object todo
     */
    render: function(todo) {
        // Select todo list element
        var ul = document.getElementById('todo-list');

        // Create new list item
        var li = document.createElement('li');

        // Add todo content
        var input = document.createElement('input');
        input.type = 'text';
        input.value = todo.content;
        input.readOnly = true;
        li.appendChild(input);

        // Create checkbox input
        var checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('data-todo-id', todo.id);
        checkbox.addEventListener('change', todos.checked);

        // If todo is complete
        if (todo.complete) {
          // Check the checkbox
          checkbox.checked = true;
        }

        // Add checkbox to list item
        li.appendChild(checkbox);

        // Add to todo list
        ul.appendChild(li);
    }
};

window.onload = function() {
  todos.fetch();
};
