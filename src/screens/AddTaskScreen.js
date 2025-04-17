import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  addTaskToProject,
  getProjectMembers 
} from '../data/ProjectData';
import './AddTaskScreen.css';

const AddTaskScreen = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [file, setFile] = useState(null);
  const [members, setMembers] = useState([]);

  // Load members from project with id="1" when component mounts
  useEffect(() => {
    const projectMembers = getProjectMembers("1"); // Specifically get members from project id="1"
    setMembers(projectMembers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      taskName,
      description: taskDescription,
      assignedTo: selectedPerson,
      dueDate: dueDate.toISOString().split('T')[0],
      attachment: file ? file.name : null,
      status: "pending"
    };
    addTaskToProject(projectId, newTask);
    navigate(`/projects/${projectId}`); // Redirect back to project after submission
  };

  const handleCancel = () => {
    navigate(`/projects/${projectId}`); // Redirect back to project on cancel
  };

  return (
    <div className='mainContainer'>
      <div className='projectNameContainer'>
        <h2>Add New Task</h2>
      </div>

      <form onSubmit={handleSubmit} className='taskInfoContainer'>
        <div className='taskInputContainer'>
          <label htmlFor="taskName">Task name:</label>
          <input
            id="taskName"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Add your task name"
            required
          />
        </div>

        <div className='taskInputContainer'>
          <label htmlFor="taskDescription">Task description:</label>
          <textarea
            id="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Add your task description"
            rows="4"
            required
          />
        </div>

        <div className='horizontalContainer'>
          <div className='formFieldContainer'>
            <label>Attach File:</label>
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files[0])}
              className='fileInput'
            />
          </div>

          <div className='formFieldContainer'>
            <label>Due Date:</label>
            <input
              type="date"
              value={dueDate.toISOString().split('T')[0]}
              onChange={(e) => setDueDate(new Date(e.target.value))}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className='formFieldContainer'>
            <label>Assigned to:</label>
            <select
              value={selectedPerson}
              onChange={(e) => setSelectedPerson(e.target.value)}
              required
            >
              <option value="">Select a member</option>
              {members.map(member => (
                <option key={member.id} value={member.name}>
                  {member.name} ({member.role})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='buttonContainer'>
          <button type="button" className='cancelButton' onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className='submitButton'>
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskScreen;