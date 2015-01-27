$(function() {
  var controller;
  controller = new TodoController;
  controller.fetch();
  $(document).on("click", "#add-todo", function() {
    controller.create();
  });
  $('#new-todo').keypress(function(e) {
    if (e.which === 13) {
      return controller.add();
    }
  });
  return $('#todo-list').on("click", "input[type='checkbox']", function(e) {
    var checkbox, todo;
    checkbox = e.target;
    todo = {
      id: Number($(checkbox).data("todo-id")),
      complete: checkbox.checked
    };
    controller.update(todo);
  });
});
