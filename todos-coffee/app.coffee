# Initialize express
express = require("express")
app = express()

# Allow parsing incoming json data
bodyParser = require("body-parser")
app.use bodyParser.json()

# Serve static files in public directory
app.use express.static(__dirname + "/public")

# Initialize array of todos
todos = []

# Initialize id increment
ID = 0

#
# List todos
#
app.get "/todos/", (req, res) ->
  res.send todos
  return

#
# Create a new todo
#
app.post "/todos/create", (req, res) ->

  # Initialize new todo
  todo =
    id: ID++
    complete: false
    content: req.body.content


  # Add todo
  todos.push todo

  # Send response
  res.send todo
  return

#
# Complete a todo
#
app.post "/todos/update", (req, res) ->

  # Make sure request includes id
  if typeof (req.body.id) isnt "undefined"
    i = 0
    # Loop through todos
    while i < todos.length
      # And if id matches
      if todos[i].id is req.body.id
        # Update existing properties
        if typeof (req.body.complete) isnt "undefined"
          todos[i].complete = req.body.complete

        if typeof (req.body.content) isnt "undefined"
          todos[i].content = req.body.content
      i++

  # Send response
  res.send todos
  return

#
# Remove a todo
#
app.post "/todos/remove", (req, res) ->
  todo = false

  # Make sure request includes id and a todo exists with that id
  if typeof (req.body.id) isnt "undefined"
    i = 0

    while i < todos.length
      if todos[i].id is req.body.id
        todo = todos[i]
        todos.splice(i, 1)
      i++

  # Send response
  res.send todo
  return


# Open port for server
app.listen 3000
console.log "Server running at http://localhost:3000"
