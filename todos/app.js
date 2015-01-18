// Initialize express
var express = require('express');
var app = express();

// Allow parsing incoming json data
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Create application/json parser
var jsonParser = bodyParser.json();

// Serve static files in public directory
app.use(express.static(__dirname + '/public'));

// Initialize array of todos
var todos = [];

// Initialize id increment
var ID = 0;

// List todos
app.get('/todos/', function(req, res) {
  res.send(todos);
});

// Create a new todo
app.post('/todos/create', jsonParser, function(req, res) {
  // Add id to todo and increment
  req.body.todo.id = ID++;

  // Mark incomplete
  req.body.todo.complete = false;

  // Add todo
  todos.push(req.body.todo);

  // Send response
  res.send(req.body.todo);
});

// Complete a todo
app.post('/todos/update', jsonParser, function(req, res) {
  // Make sure request includes id and a todo exists with that id
  if (typeof(req.body.id) !== 'undefined' && todos[req.body.id]) {
    // Change todo completion
    todos[req.body.id].complete = req.body.complete;
  }

  // Send response
  res.send(todos);
});

// Set port for server
app.listen(3000);

console.log('Server running at http://localhost:3000');
