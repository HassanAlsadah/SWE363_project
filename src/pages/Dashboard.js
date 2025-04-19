// components/Dashboard/Dashboard.js
import React from 'react';
import './Dashboard.css';

const Dashboard = ({ project, members, tasks }) => {
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-stats">
        <div className="dashboard-card">
          <h2>Project Overview</h2>
          <p>{project.description}</p>
        </div>

        <div className="dashboard-card">
          <h2>Team Statistics</h2>
          <div className="dashboard-grid">
            <div className="stat-box blue">
              <div>{members.length}</div>
              <span>Team Members</span>
            </div>
            <div className="stat-box green">
              <div>{completedTasks}</div>
              <span>Completed Tasks</span>
            </div>
            <div className="stat-box yellow">
              <div>{inProgressTasks}</div>
              <span>In Progress</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {tasks.slice(0, 3).map(task => (
            <div
              key={task.id}
              className={`activity-item ${
                task.status === 'Completed'
                  ? 'green-border'
                  : task.status === 'In Progress'
                  ? 'yellow-border'
                  : 'gray-border'
              }`}
            >
              <div className="activity-header">
                <span>{task.title}</span>
                <span className="date">Due: {task.deadline}</span>
              </div>
              <div className="activity-sub">
                Assigned to: {task.assignedTo} • Status: {task.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
