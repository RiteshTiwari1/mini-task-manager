import React, { useState } from 'react';
import { Task } from '../../types';
import { useTask } from '../../context/TaskContext';
import TaskEditForm from './TaskEditForm';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { updateTask, deleteTask } = useTask();

  const handleStatusToggle = async () => {
    try {
      await updateTask(task.id, {
        status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED'
      });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isEditing) {
    return (
      <TaskEditForm
        task={task}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className={`card hover:shadow-md transition-all duration-200 ${isDeleting ? 'opacity-50' : ''} ${
      task.status === 'COMPLETED' ? 'bg-green-50 border-green-200' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <button
              onClick={handleStatusToggle}
              className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                task.status === 'COMPLETED'
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 hover:border-primary-400'
              }`}
              disabled={isDeleting}
            >
              {task.status === 'COMPLETED' && (
                <svg className="w-3 h-3 text-white m-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            <h3 className={`text-lg font-medium ${
              task.status === 'COMPLETED' ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
          </div>
          
          {task.description && (
            <p className={`text-sm mb-3 ${
              task.status === 'COMPLETED' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Created: {formatDate(task.createdAt)}</span>
              {task.updatedAt !== task.createdAt && (
                <span>Updated: {formatDate(task.updatedAt)}</span>
              )}
            </div>
            
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              task.status === 'COMPLETED'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {task.status === 'COMPLETED' ? 'Completed' : 'Pending'}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
            disabled={isDeleting}
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            disabled={isDeleting}
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;