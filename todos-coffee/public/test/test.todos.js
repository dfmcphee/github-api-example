describe('Library Tests', function () {
  before(function () {
    // set up the environment
  });

  it('Should be able to add a new Todo', function () {
    // make assertions
    var controller = new TodoController();
    controller.add({id: 1, content: 'test todo', complete: false});

    assert(controller.collection.length === 1);
  });
});
