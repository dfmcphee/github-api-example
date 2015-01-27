var TodoController;

TodoController = (function() {
  function TodoController(collection) {
    this.collection = collection != null ? collection : [];
  }

  TodoController.prototype.create = function() {
    var content, self, url;
    self = this;
    content = $("#new-todo").val();
    url = "http://localhost:3000/todos/create";
    $.ajax(url, {
      type: "POST",
      data: JSON.stringify({
        content: content
      }),
      contentType: "application/json",
      success: function(data) {
        self.add(data).render();
        return $('#new-todo').val("");
      },
      error: function() {
        return alert("Something went wrong. Please try again.");
      }
    });
  };

  TodoController.prototype.add = function(data) {
    var todo;
    todo = new Todo(data);
    this.collection.push(todo);
    return todo;
  };

  TodoController.prototype.fetch = function() {
    var self, url;
    self = this;
    url = "http://localhost:3000/todos/";
    $.ajax(url, {
      type: "GET",
      contentType: "application/json",
      success: function(data) {
        var todo, _i, _len;
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          todo = data[_i];
          self.collection.push(new Todo(todo));
        }
        return self.list();
      },
      error: function() {
        return alert("Something went wrong. Please try again.");
      }
    });
  };

  TodoController.prototype.list = function() {
    var todo, _i, _len, _ref;
    $('#todo-list').empty();
    _ref = this.collection;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      todo = _ref[_i];
      todo.render();
    }
  };

  return TodoController;

})();
