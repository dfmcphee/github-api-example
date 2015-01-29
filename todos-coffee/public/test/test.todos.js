describe("Library Tests", function() {
  before(function() {});
  it("Should be able to add a new Todo", function() {
    var list, todo;
    list = new List();
    todo = {
      _id: "1",
      content: "test todo",
      complete: false
    };
    list.add(todo);
    assert(list.todos.length === 1);
  });
  it("Should initialize todo correctly", function() {
    var list, todo;
    list = new List();
    todo = {
      _id: "1",
      content: "test content",
      complete: false
    };
    list.add(todo);
    assert(list.todos[0].content === "test content");
  });
  it("Should be able to remove a Todo", function() {
    var list, todo;
    list = new List();
    todo = {
      _id: "1",
      content: "test todo",
      complete: false
    };
    list.add(todo);
    list.remove("1");
    assert(list.todos.length === 0);
  });
  it("Should be able to search for a Todo", function() {
    var list, result, todo;
    list = new List();
    todo = {
      _id: "1",
      content: "test todo",
      complete: false
    };
    list.add(todo);
    result = list.findById("1");
    assert(result === list.todos[0]);
  });
  it("Search should return false if no results", function() {
    var list, result, todo;
    list = new List();
    todo = {
      _id: "1",
      content: "test todo",
      complete: false
    };
    list.add(todo);
    result = list.findById("3");
    assert(result === false);
  });
});
