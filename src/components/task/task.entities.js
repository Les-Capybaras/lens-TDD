import crypto from 'crypto';

class Task {
  constructor(completed, description) {
    this.id = crypto.randomUUID();
    this.completed = completed;
    this.description = description;
  }

  toJSON() {
    return {
      id: this.id,
      completed: this.completed,
      description: this.description,
    };
  }
}

export default Task;
