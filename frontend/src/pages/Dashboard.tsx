import React from 'react';
import Header from '../components/layout/Header';
import TaskList from '../components/tasks/TaskList';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <TaskList />
      </main>
    </div>
  );
};

export default Dashboard;