import React, { useState, useMemo } from 'react';
import { useTask } from '../../context/TaskContext';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import LoadingSpinner from '../common/LoadingSpinner';

type FilterType = 'all' | 'pending' | 'completed';

const TaskList: React.FC = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const { tasks, isLoading } = useTask();

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'pending':
        return tasks.filter(task => task.status === 'PENDING');
      case 'completed':
        return tasks.filter(task => task.status === 'COMPLETED');
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'COMPLETED').length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Tasks</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                Total: {taskStats.total}
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                Pending: {taskStats.pending}
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                Completed: {taskStats.completed}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => setShowTaskForm(true)}
            className="btn btn-primary flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Task
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg inline-flex">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {isLoading && tasks.length === 0 ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
          </h3>
          <p className="text-gray-500 mb-4">
            {filter === 'all' 
              ? 'Get started by creating your first task!'
              : `You don't have any ${filter} tasks at the moment.`
            }
          </p>
          {filter === 'all' && (
            <button
              onClick={() => setShowTaskForm(true)}
              className="btn btn-primary"
            >
              Create Your First Task
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      {showTaskForm && (
        <TaskForm onClose={() => setShowTaskForm(false)} />
      )}
    </div>
  );
};

export default TaskList;