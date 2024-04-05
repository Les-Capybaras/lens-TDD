export const mockTasks = [
  {
    id: "1",
    completed: true,
    description: "jaj"
  },
  {
    id: "2",
    completed: false,
    description: "jaj 2"
  }
];

export const mockTaskRepository = {
  findAll: jest.fn(() => mockTasks),
  findOne: jest.fn(id => ({
    id: id,
    completed: true,
    description: "updated description"
  })),
  update: jest.fn((id, task) => ({
    id: id,
    completed: task.completed,
    description: task.description
  }))
};