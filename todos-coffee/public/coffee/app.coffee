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
      controller.create()

  # Add event listener when chekbox is checked/unchecked
  $('#todo-list').on "click", "input[type='checkbox']", (e) ->
    checkbox = e.target

    # Get ID from data attribute on checkbox
    todo =
      id: Number $(checkbox).closest('li').data("todo-id")
      complete: checkbox.checked

    # Update todo
    controller.update(todo)
    return

  # Add event listener when text input is double clicked
  $('#todo-list').on "dblclick", "input[type='text']", (e) ->
    ro = $(this).prop('readonly')
    if ro
      $(this).prop('readonly', !ro).focus()
      $(this).parent().append('<button class="button">Delete</button>')
    return

  # Add event when todo input is blurred
  $('#todo-list').on "blur", "input[type='text']", (e) ->
    input = e.target
    id = Number $(input).closest('li').data("todo-id")

    todo =
      id: id
      complete: $('#todo-complete-' + id).checked
      content: $(input).val()

    # Update todo
    controller.update(todo)
    $(input).prop('readonly', true)
    setTimeout ( ->
      $(input).parent().find('button').remove()
      return
    ), 100
    return

  # Add event when todo delete is clicked
  $('#todo-list').on "click", "button", (e) ->
    id = Number $(this).closest('li').data("todo-id")
    controller.remove(id)
    return
