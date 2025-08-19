import apiClient from './client';
import { Task, TaskResponse, TasksResponse } from '../types';

export const tasksApi = {
  getTasks: async (): Promise<TasksResponse> => {
    const response = await apiClient.get('/tasks');
    return response.data;
  },

  createTask: async (title: string, description?: string): Promise<TaskResponse> => {
    const response = await apiClient.post('/tasks', { title, description });
    return response.data;
  },

  updateTask: async (id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'status'>>): Promise<TaskResponse> => {
    const response = await apiClient.put(`/tasks/${id}`, updates);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  }
};