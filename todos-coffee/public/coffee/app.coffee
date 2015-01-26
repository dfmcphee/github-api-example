#
# Todos
#
todos =

  #
  # Adds a new todo
  #
  add: ->
    self = this

    # Get todo content from input
    content = $("#new-todo").val()

    # Set url for request
    url = "http://localhost:3000/todos/create"

    # Send ajax POST request
    $.ajax url,
      type: "POST"
      data: JSON.stringify({content: content})
      contentType: "application/json"
      success: (data) ->
        # Render the new todo
        self.render data

        # Reset the input content
        $('#new-todo').val ""
      error: ->
        # Output error if request fails
        alert "Something went wrong. Please try again."
    return


  #
  # Event when a checkbox is checked or unchecked
  # @param event e
  #
  checked: (e) ->
    checkbox = e.target

    # Get ID from data attribute on checkbox
    todo =
      id: Number $(checkbox).data("todo-id")
      complete: checkbox.checked

    # Update todo
    todos.update todo
    return


  #
  # Updates a todo
  # @param object todo
  #
  update: (todo) ->
    # Set url for request
    url = "/todos/update"

    # Open and send the request
    $.ajax url,
      type: "POST"
      data: JSON.stringify(todo)
      contentType: "application/json"


  #
  # Gets list of todos from the server
  #
  fetch: ->
    self = this

    # Set url for request
    url = "http://localhost:3000/todos/"

    # Send ajax GET request for list of todos
    $.ajax url,
      type: "GET"
      contentType: "application/json"
      success: (data) ->
        # Render fetched list of todos
        self.list data
      error: ->
        # Output error if request fails
        alert "Something went wrong. Please try again."
    return

  #
  # Renders a list of todos
  # @param array todoList
  #
  list: (todoList) ->
    # Select todo list element
    ul = document.getElementById("todo-list")

    # Remove any exisiting list elements
    ul.removeChild ul.firstChild  while ul.firstChild

    # Loop through and render each todo item
    i = 0

    while i < todoList.length
      @render todoList[i]
      i++
    return


  #
  # Renders a todo item
  # @param object todo
  #
  render: (todo) ->
    # Create new list item
    li = $("<li></li>")

    # Add todo content to readonly text input
    input = $("<input type='text' readonly />")
    input.val todo.content
    li.append input

    # Create checkbox input
    checkbox_wrapper = $("<div class='checkbox'>")
    checkbox = $("<input type='checkbox' id='todo-" + todo.id + "' />")

    # Set checkbox checked
    checkbox.prop "checked", todo.complete

    # Add the todo id as a data attribute on checkbox
    checkbox.attr "data-todo-id", todo.id

    # Add checkbox to wrapper
    checkbox_wrapper.append checkbox

    # Add label to wrapper
    checkbox_wrapper.append "<label for='todo-" + todo.id + "'></label>"

    # Add checkbox wrapper to list item
    li.append checkbox_wrapper

    # Add to todo list
    $("#todo-list").append li
    return

# On document ready
$ ->
  # Fetch list of todos
  todos.fetch()

  # Add event listener when add button is clicked
  $(document).on "click", "#add-todo", ->
    todos.add()
    return

  # Add event listener when enter key is pressed
  $('#new-todo').keypress (e) ->
    if (e.which == 13)
      todos.add()

  # Add event listener when chekbox is checked/unchecked
  $('#todo-list').on "click", "input[type='checkbox']", todos.checked

  return
