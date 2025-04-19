import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../data/ProjectData';
import '../App.css';


const TaskInformationScreen = () => {
  const { projectId, taskId } = useParams();
  const [task, setTask] = useState(null);
  const [projectStatus, setProjectStatus] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const project = getProjectById(projectId);
    if (project) {
      const foundTask = project.tasks.find(t => t.id === taskId);
      if (foundTask) {
        setTask(foundTask);
        setProjectStatus(project.status);
        setDueDate(foundTask.dueDate);
      }
    }
  }, [projectId, taskId]);

  if (!task) return <div>Task not found</div>;

  return (


    <div className="task-info-page">
      <h1>{task.taskName}</h1>
      

      <div className='task-info-container'>

        <div className='task-info'>
          <p><strong>Description:</strong> {task.description}</p>
        </div>

        <div className='task-info'>
          <p><strong>Assigned To:</strong> {task.assignedTo}</p>
        </div>

        <div className='task-info'>
          <div className='task-attach'>
        <p><strong>Attachment:</strong></p>{' '}
        {task.attachment ? (
          <a href={`/${task.attachment}`} download>{task.attachment}</a>
        ) : (
          'No file attached'
        )}
      </div>
      </div>

      <div className='task-info'>
      <div>
        <label><strong>Project Status:</strong></label>
        <select value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)}>
          <option value="planning">Planning</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      </div>

      <div className='task-info'>
        <p><strong>Due Date:</strong> {dueDate}</p>


      </div>


        


      
      
      
      

      
    </div>
    </div>
  );
};

export default TaskInformationScreen;
