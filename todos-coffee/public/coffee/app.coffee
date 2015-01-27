# On document ready
$ ->
  controller = new TodoController

  # Fetch list of todos
  controller.fetch()

  # Add event listener when add button is clicked
  $(document).on "click", "#add-todo", ->
    controller.create()
    return

  # Add event listener when enter key is pressed
  $('#new-todo').keypress (e) ->
    if (e.which == 13)
      controller.add()

  # Add event listener when chekbox is checked/unchecked
  $('#todo-list').on "click", "input[type='checkbox']", (e) ->
    checkbox = e.target

    # Get ID from data attribute on checkbox
    todo =
      id: Number $(checkbox).data("todo-id")
      complete: checkbox.checked

    # Update todo
    controller.update todo
    return
