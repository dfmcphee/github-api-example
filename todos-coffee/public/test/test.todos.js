describe("Library Tests", function() {
  before(function() {});
  it("Should be able to add a new Todo", function() {
    var controller;
    controller = new TodoController();
    controller.add({
      id: 1,
      content: "test todo",
      complete: false
    });
    assert(controller.collection.length === 1);
  });
  it("Should initialize todo correctly", function() {
    var controller;
    controller = new TodoController();
    controller.add({
      id: 1,
      content: "test content",
      complete: true
    });
    assert(controller.collection[0].content === "test content");
  });
  it("Should be able to remove a Todo", function() {
    var controller;
    controller = new TodoController();
    controller.add({
      id: 1,
      content: "test todo",
      complete: false
    });
    controller.remove(1);
    assert(controller.collection.length === 0);
  });
  it("Should be able to search for a Todo", function() {
    var controller, result;
    controller = new TodoController();
    controller.add({
      id: 1,
      content: "test todo",
      complete: false
    });
    result = controller.findById(1);
    assert(result === controller.collection[0]);
  });
  it("Search should return false if no results", function() {
    var controller, result;
    controller = new TodoController();
    controller.add({
      id: 1,
      content: "test todo",
      complete: false
    });
    result = controller.findById(3);
    assert(result === false);
  });
});
