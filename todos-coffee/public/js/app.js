$(function() {
  var controller;
  controller = new TodoController;
  controller.fetch();
  $(document).on("click", "#add-todo", function() {
    controller.create();
  });
  $('#new-todo').keypress(function(e) {
    if (e.which === 13) {
      return controller.create();
    }
  });
  $('#todo-list').on("click", "input[type='checkbox']", function(e) {
    var checkbox, todo;
    checkbox = e.target;
    todo = {
      id: Number($(checkbox).closest('li').data("todo-id")),
      complete: checkbox.checked
    };
    controller.update(todo);
  });
  $('#todo-list').on("dblclick", "input[type='text']", function(e) {
    var ro;
    ro = $(this).prop('readonly');
    if (ro) {
      $(this).prop('readonly', !ro).focus();
      $(this).parent().append('<button class="button">Delete</button>');
    }
  });
  $('#todo-list').on("blur", "input[type='text']", function(e) {
    var id, input, todo;
    input = e.target;
    id = Number($(input).closest('li').data("todo-id"));
    todo = {
      id: id,
      complete: $('#todo-complete-' + id).checked,
      content: $(input).val()
    };
    controller.update(todo);
    $(input).prop('readonly', true);
    setTimeout((function() {
      $(input).parent().find('button').remove();
    }), 100);
  });
  return $('#todo-list').on("click", "button", function(e) {
    var id;
    id = Number($(this).closest('li').data("todo-id"));
    controller.remove(id);
  });
});
