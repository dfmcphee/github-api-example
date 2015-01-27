var Todo;

Todo = (function() {
  function Todo(todo) {
    this.id = todo.id;
    this.content = todo.content;
    this.complete = todo.complete;
  }

  Todo.prototype.render = function() {
    var checkbox, checkbox_wrapper, input, li;
    li = $("<li></li>");
    input = $("<input type='text' readonly />");
    input.val(this.content);
    li.append(input);
    checkbox_wrapper = $("<div class='checkbox'>");
    checkbox = $("<input type='checkbox' id='todo-" + this.id + "' />");
    checkbox.prop("checked", this.complete);
    checkbox.attr("data-todo-id", this.id);
    checkbox_wrapper.append(checkbox);
    checkbox_wrapper.append("<label for='todo-" + this.id + "'></label>");
    li.append(checkbox_wrapper);
    $("#todo-list").append(li);
  };

  Todo.prototype.update = function() {
    var todo, url;
    url = "/todos/update";
    todo = {
      id: this.id,
      content: this.content,
      complete: this.complete
    };
    return $.ajax(url, {
      type: "POST",
      data: JSON.stringify(todo),
      contentType: "application/json"
    });
  };

  return Todo;

})();
