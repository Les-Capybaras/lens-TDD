import Task from './task.entities.js';

class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  getTask = (req, res) => {
    const { id } = req.params;
    return res.status(200).send(this.taskService.getTask(id));
  };

  updateTask = async (req, res) => {
    const { id } = req.params;
    const task = new Task(req.body.name, req.body.description, req.body.status);
    return res.status(200).send(await this.taskService.updateTask(id, task));
  };
}

export default TaskController;
