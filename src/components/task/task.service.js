class TaskService {
  constructor(taskRepository) {
    this.tasks = [];
    this.taskRepository = taskRepository;
  }

  getTasks = () => this.taskRepository.findAll();

  getTask = () => this.taskRepository.findOne();

  updateTask = (taskId, task) => {

    const existingTask = this.taskRepository.findOne(taskId);

    if (!existingTask) {
      throw new Error("Task not found");
    }
    
    return this.taskRepository.update(taskId, task);
  }
}

export default TaskService;
