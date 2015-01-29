describe "Library Tests", ->
  before ->

  it "Should be able to add a new Todo", ->
    controller = new TodoController()
    controller.add
      id: 1
      content: "test todo"
      complete: false

    assert controller.collection.length is 1
    return

  it "Should initialize todo correctly", ->
    controller = new TodoController()
    controller.add
      id: 1
      content: "test content"
      complete: true

    assert controller.collection[0].content is "test content"
    return

  it "Should be able to remove a Todo", ->
    controller = new TodoController()
    controller.add
      id: 1
      content: "test todo"
      complete: false

    controller.remove 1
    assert controller.collection.length is 0
    return

  it "Should be able to search for a Todo", ->
    controller = new TodoController()
    controller.add
      id: 1
      content: "test todo"
      complete: false

    result = controller.findById(1)
    assert result is controller.collection[0]
    return

  it "Search should return false if no results", ->
    controller = new TodoController()
    controller.add
      id: 1
      content: "test todo"
      complete: false

    result = controller.findById(3)
    assert result is false
    return

  return
