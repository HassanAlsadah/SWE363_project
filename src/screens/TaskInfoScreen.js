import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TasksData } from '../data/TasksData';
import "../styles/TaskInfoScreen.css";

const TaskInfoScreen = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundTask = TasksData.find(t => t.id === taskId);
    if (foundTask) {
      setTask({...foundTask});
    }
    setIsLoading(false);
  }, [taskId]);

  const handleStatusChange = (newStatus) => {
    const updatedTask = {...task, status: newStatus};
    setTask(updatedTask);
    
    const taskIndex = TasksData.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      TasksData[taskIndex] = updatedTask;
      
      if (newStatus === "Completed" && !TasksData[taskIndex].completedDate) {
        TasksData[taskIndex].completedDate = new Date().toISOString().split('T')[0];
      }
    }
  };

  if (isLoading) return (
    <div className="task-info-page">
      <div className="loading-spinner">Loading task details...</div>
    </div>
  );

  if (!task) return (
    <div className="task-info-page">
      <div className="error-message">Task not found</div>
    </div>
  );

  return (
    <div className="task-info-page">
      <h1>{task.name}</h1>
      
      <div className='task-info-container'>
        <div className='task-info'>
          <p><strong>Project:</strong> {task.projectName}</p>
        </div>

        <div className='task-info'>
          <p><strong>Description:</strong> {task.description || "No description provided"}</p>
        </div>

        <div className='task-info'>
          <p><strong>Assigned To:</strong> {task.assignedTo || "Unassigned"}</p>
        </div>

        <div className='task-info'>
          <p>
            <strong>Status:</strong> 
            <select 
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="status-select"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <span className={`status ${task.status.toLowerCase().replace(' ', '-')}`}>
              {task.status}
            </span>
          </p>
        </div>

        <div className='task-info'>
          <p><strong>Due Date:</strong> {task.dueDate || "No due date"}</p>
          {task.completedDate && (
            <p><strong>Completed Date:</strong> {task.completedDate}</p>
          )}
        </div>

        {task.attachment && (
          <div className='task-info task-attach'>
            <p>
              <strong>Attachment:</strong> 
              <a href={task.attachment.url} target="_blank" rel="noopener noreferrer">
                {task.attachment.name}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskInfoScreen;