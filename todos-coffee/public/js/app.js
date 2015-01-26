(function() {
  var todos;

  todos = {
    add: function() {
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
          self.render(data);
          return $('#new-todo').val("");
        },
        error: function() {
          return alert("Something went wrong. Please try again.");
        }
      });
    },
    checked: function(e) {
      var checkbox, todo;
      checkbox = e.target;
      todo = {
        id: Number($(checkbox).data("todo-id")),
        complete: checkbox.checked
      };
      todos.update(todo);
    },
    update: function(todo) {
      var url;
      url = "/todos/update";
      return $.ajax(url, {
        type: "POST",
        data: JSON.stringify(todo),
        contentType: "application/json"
      });
    },
    fetch: function() {
      var self, url;
      self = this;
      url = "http://localhost:3000/todos/";
      $.ajax(url, {
        type: "GET",
        contentType: "application/json",
        success: function(data) {
          return self.list(data);
        },
        error: function() {
          return alert("Something went wrong. Please try again.");
        }
      });
    },
    list: function(todoList) {
      var i, ul;
      ul = document.getElementById("todo-list");
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      i = 0;
      while (i < todoList.length) {
        this.render(todoList[i]);
        i++;
      }
    },
    render: function(todo) {
      var checkbox, checkbox_wrapper, input, li;
      li = $("<li></li>");
      input = $("<input type='text' readonly />");
      input.val(todo.content);
      li.append(input);
      checkbox_wrapper = $("<div class='checkbox'>");
      checkbox = $("<input type='checkbox' id='todo-" + todo.id + "' />");
      checkbox.prop("checked", todo.complete);
      checkbox.attr("data-todo-id", todo.id);
      checkbox_wrapper.append(checkbox);
      checkbox_wrapper.append("<label for='todo-" + todo.id + "'></label>");
      li.append(checkbox_wrapper);
      $("#todo-list").append(li);
    }
  };

  $(function() {
    todos.fetch();
    $(document).on("click", "#add-todo", function() {
      todos.add();
    });
    $('#new-todo').keypress(function(e) {
      if (e.which === 13) {
        return todos.add();
      }
    });
    $('#todo-list').on("click", "input[type='checkbox']", todos.checked);
  });

}).call(this);
