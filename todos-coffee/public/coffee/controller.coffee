#
# TodoController
#
class TodoController
  constructor: (@collection=[]) ->

  #
  # Creates a new todo
  #
  create: ->
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
        self.add().render()

        # Reset the input content
        $('#new-todo').val ""
      error: ->
        # Output error if request fails
        alert "Something went wrong. Please try again."
    return

  #
  # Adds a new todo
  #
  add: (data) ->
    # Initialize a new Todo
    todo = new Todo(data)

    # Add it to the collection
    @collection.push(todo)

    return todo

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
        for todo in data
          self.collection.push(new Todo(todo))

        self.list()
      error: ->
        # Output error if request fails
        alert "Something went wrong. Please try again."
    return

  #
  # Renders a list of todos
  # @param array todoList
  #
  list: ->
    # Remove any exisiting list elements
    $('#todo-list').empty()

    for todo in @collection
      todo.render()

    return
