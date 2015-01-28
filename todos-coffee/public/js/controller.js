var TodoController;

TodoController = (function() {
  function TodoController(collection) {
    this.collection = collection != null ? collection : [];
  }

  TodoController.prototype.create = function() {
    var content, self, url;
    self = this;
    content = $("#new-todo").val();
    url = "/todos/create";
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

  TodoController.prototype.remove = function(id) {
    var todo, _i, _len, _ref;
    _ref = this.collection;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      todo = _ref[_i];
      if (todo.id === id) {
        todo.remove();
        this.collection.splice(this.collection.indexOf(todo), 1);
        return true;
      }
    }
    return false;
  };

  TodoController.prototype.findById = function(id) {
    var todo, _i, _len, _ref;
    _ref = this.collection;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      todo = _ref[_i];
      if (todo.id === id) {
        return todo;
      }
    }
    return false;
  };

  TodoController.prototype.update = function(updatedTodo) {
    var todo, _i, _len, _ref;
    _ref = this.collection;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      todo = _ref[_i];
      if (todo.id === updatedTodo.id) {
        todo.complete = updatedTodo.complete;
        todo.content = updatedTodo.content;
        todo.publish();
        return true;
      }
    }
    return false;
  };

  TodoController.prototype.fetch = function() {
    var self, url;
    self = this;
    url = "/todos/";
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
