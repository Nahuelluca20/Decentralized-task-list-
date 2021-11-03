const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", () => {
  before(async () => {
    this.tasksContract = await TasksContract.deployed();
  });

  it("migrate deploy successfully", async () => {
    const address = this.tasksContract.address;
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("get Task list", async () => {
    taskCounter = await this.tasksContract.taskCounter();
    const task = await this.tasksContract.tasks(taskCounter);

    assert.equal(task.id.toNumber(), taskCounter);
    assert.equal(task.title, "Mi primer Tarea de ej");
    assert.equal(task.description, "Tengo que hacer algo");
    assert.equal(task.done, false);
    assert.equal(taskCounter, 1);
  });

  it("task created succesfully", async () => {
    const result = await this.tasksContract.createTask(
      "some task",
      "description 2"
    );
    const taskEvent = result.logs[0].args;
    const taskCounter = await this.tasksContract.taskCounter();

    assert.equal(taskCounter, 2);
    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.title, "some task");
    assert.equal(taskEvent.description, "description 2");
    assert.equal(taskEvent.done, false);
  });

  it("Task Toggle Done", async() => {
    const result = await this.tasksContract.toggleDone(1);
    const taskEvent = result.logs[0].args;
    const task = await this.tasksContract.tasks(1);

    assert.equal(task.done, true);
    assert.equal(taskEvent.done, true);
    assert.equal(taskEvent.id, 1);
  });
});
