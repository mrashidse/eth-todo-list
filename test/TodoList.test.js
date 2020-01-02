const TodoList = artifacts.require("TodoList");

contract("TodoList",(accounts)=>{
	before(async()=>{
		this.todoList = await TodoList.deployed();
	});

	it("Deployed Successfully!", async()=>{
		const address = await this.todoList.address;
		assert.notEqual(address, 0x0);
		assert.notEqual(address, '');
		assert.notEqual(address, null);
		assert.notEqual(address, undefined);
	});

	it("List Tasks", async()=>{
		const taskCount = await this.todoList.taskCount();
		const task = await this.todoList.tasks(taskCount);
		assert.equal(task.id.toNumber(), taskCount.toNumber());
		assert.equal(task.content, 'Checkout my 1st Demo Task')
	    assert.equal(task.completed, false)
	    assert.equal(taskCount.toNumber(), 1)
	});
	
	it("Creates Tasks", async()=>{
		const newId = 2;
		const content = "My 1st New Task";
		const result = await this.todoList.createTask(content);
		const taskCount = await this.todoList.taskCount();
	    assert.equal(taskCount.toNumber(), newId);
	    const event = result.logs[0].args;
	    assert.equal(event.id, newId);
	    assert.equal(event.content, content);
	    assert.equal(event.completed, false);

	});


});