import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Task, TaskContextType } from '../types';
import { tasksApi } from '../api/tasks';
import { useAuth } from './AuthContext';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const response = await tasksApi.getTasks();
      setTasks(response.tasks);
    } catch (error: any) {
      console.error('Failed to fetch tasks:', error);
      throw new Error(error.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const createTask = async (title: string, description?: string) => {
    setIsLoading(true);
    try {
      const response = await tasksApi.createTask(title, description);
      setTasks(prev => [response.task, ...prev]);
    } catch (error: any) {
      console.error('Failed to create task:', error);
      throw new Error(error.response?.data?.error || 'Failed to create task');
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'status'>>) => {
    setIsLoading(true);
    try {
      const response = await tasksApi.updateTask(id, updates);
      setTasks(prev => prev.map(task => task.id === id ? response.task : task));
    } catch (error: any) {
      console.error('Failed to update task:', error);
      throw new Error(error.response?.data?.error || 'Failed to update task');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setIsLoading(true);
    try {
      await tasksApi.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error: any) {
      console.error('Failed to delete task:', error);
      throw new Error(error.response?.data?.error || 'Failed to delete task');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user, fetchTasks]);

  const value: TaskContextType = {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    fetchTasks,
    isLoading
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};