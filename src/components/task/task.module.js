import TaskController from './task.controller.js';
import TaskService from './task.service.js';
import TaskRouter from './task.router.js';
import TaskRepository from './task.repository.js';
import TaskModel from './task.model.js';

const taskRepository = new TaskRepository(TaskModel);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);
const taskRouter = new TaskRouter(taskController);

export default {
  service: taskService,
  controller: taskController,
  router: taskRouter.getRouter(),
};
