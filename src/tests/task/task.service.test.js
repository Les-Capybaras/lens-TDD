/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, it } from '@jest/globals';
import TaskService from '../../components/task/task.service';
import { mockTaskRepository, mockTasks } from './task.mock';

describe('TaskService', () => {
  const taskService = new TaskService(mockTaskRepository);

  describe('getTasks', () => {
    it('should return the tasks list', () => {
      // WHEN
      const tasks = taskService.getTasks();
      // THEN
      expect(tasks).toEqual(mockTasks);
    });

    it('should return an empty list', () => {
      // GIVEN
      mockTaskRepository.findAll.mockImplementation(() => []);
      // WHEN
      const tasks = taskService.getTasks();
      // THEN
      expect(tasks).toEqual([]);
    });
  });

  describe('updateTask', () => {
    it('should return the updated task', () => {
      // GIVEN
      const taskId = '1';
      const updatedTask = {
        completed: true,
        description: 'updated description',
      };
      const expectedUpdatedTask = {
        id: taskId,
        completed: true,
        description: 'updated description',
      };
      // WHEN
      const updated = taskService.updateTask(taskId, updatedTask);
      // THEN
      expect(updated).toEqual(expectedUpdatedTask);
    });

    it('should throw an error if task is not found', () => {
      // GIVEN
      const taskId = 'non_existing_id';
      const updatedTask = {
        completed: true,
        description: 'updated description',
      };
      mockTaskRepository.findOne.mockImplementation(() => null);
      // WHEN
      const updateTask = () => taskService.updateTask(taskId, updatedTask);
      // THEN
      expect(updateTask).toThrowError('Task not found');
    });
  });
});
