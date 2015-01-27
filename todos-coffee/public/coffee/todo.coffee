#
# Todo
#
class Todo
  constructor: (todo) ->
    @id = todo.id
    @content = todo.content
    @complete = todo.complete

  #
  # Renders a todo item
  #
  render: ->
    # Create new list item
    li = $("<li></li>")

    # Add todo content to readonly text input
    input = $("<input type='text' readonly />")
    input.val @content
    li.append input

    # Create checkbox input
    checkbox_wrapper = $("<div class='checkbox'>")
    checkbox = $("<input type='checkbox' id='todo-" + @id + "' />")

    # Set checkbox checked
    checkbox.prop "checked", @complete

    # Add the todo id as a data attribute on checkbox
    checkbox.attr "data-todo-id", @id

    # Add checkbox to wrapper
    checkbox_wrapper.append checkbox

    # Add label to wrapper
    checkbox_wrapper.append "<label for='todo-" + @id + "'></label>"

    # Add checkbox wrapper to list item
    li.append checkbox_wrapper

    # Add to todo list
    $("#todo-list").append li
    return


  #
  # Updates a todo
  #
  update: ->
    # Set url for request
    url = "/todos/update"

    todo =
      id: @id
      content: @content
      complete: @complete

    # Open and send the request
    $.ajax url,
      type: "POST"
      data: JSON.stringify(todo)
      contentType: "application/json"
