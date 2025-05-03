import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../utils/api';
import '../styles/AddTaskScreen.css';

const AddTaskScreen = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    taskName: '',
    description: '',
    assignedTo: '',
    deadline: new Date().toISOString().split('T')[0],
    status: 'Not Started'
  });
  const [file, setFile] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState({
    members: false,
    submission: false
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(prev => ({ ...prev, members: true }));
        setError('');
        
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(api.projects.getById(projectId), {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const projectData = response.data.data || response.data;
        if (!projectData.members || projectData.members.length === 0) {
          throw new Error('No members found in this project');
        }

        setMembers(projectData.members);
      } catch (err) {
        const errorMsg = err.response?.data?.message || 
                        err.message || 
                        'Failed to fetch project members';
        setError(errorMsg);
        
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(prev => ({ ...prev, members: false }));
      }
    };

    fetchMembers();
  }, [projectId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.assignedTo) {
      setError('Please select a team member to assign this task');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, submission: true }));
      setError('');

      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const formDataToSend = new FormData();
      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      // Append file if exists
      if (file) {
        formDataToSend.append('attachment', file);
      }

      const response = await axios.post(
        api.tasks.getByProject(projectId),
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        navigate(`/projects/${projectId}/tasks`);
      } else {
        throw new Error(response.data.message || 'Task creation failed');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 
                      error.message || 
                      'Failed to create task';
      setError(errorMsg);
      
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(prev => ({ ...prev, submission: false }));
    }
  };

  const handleCancel = () => {
    navigate(`/projects/${projectId}/tasks`);
  };

  return (
    <div className="mainContainer">
      <div className="projectNameContainer">
        <h2>Add New Task</h2>
        {members.length > 0 && (
          <p className="member-count">{members.length} team members available</p>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading.members ? (
        <div className="loading-message">Loading project members...</div>
      ) : members.length === 0 ? (
        <div className="no-members-warning">
          No members available in this project to assign tasks
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="taskInfoContainer">
          <div className="taskInputContainer">
            <label htmlFor="taskName">Task name:</label>
            <input
              id="taskName"
              name="taskName"
              type="text"
              value={formData.taskName}
              onChange={handleChange}
              placeholder="Add your task name"
              required
              disabled={loading.submission}
            />
          </div>

          <div className="taskInputContainer">
            <label htmlFor="description">Task description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add your task description"
              rows="4"
              required
              disabled={loading.submission}
            />
          </div>

          <div className="horizontalContainer">
            <div className="formFieldContainer">
              <label>Attach File:</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="fileInput"
                disabled={loading.submission}
              />
            </div>

            <div className="formFieldContainer">
              <label>Due Date:</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
                disabled={loading.submission}
              />
            </div>

            <div className="formFieldContainer">
              <label>Assigned to:</label>
              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                required
                disabled={loading.submission}
              >
                <option value="">Select a member</option>
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name} ({member.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="buttonContainer">
            <button 
              type="button" 
              className="cancelButton" 
              onClick={handleCancel}
              disabled={loading.submission}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submitButton"
              disabled={loading.submission}
            >
              {loading.submission ? 'Saving...' : 'Save Task'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTaskScreen;