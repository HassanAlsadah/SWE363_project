import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import "../styles/UserProjectsscreen.css";
import axios from 'axios';
import { api } from '../utils/api';

function UserProjectsPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Create axios instance with auth header
        const apiClient = axios.create({
          baseURL: api.baseUrl,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Fetch projects
        const response = await apiClient.get(api.projects.getUserProjects);
        setProjects(response.data.data || response.data);
        
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load projects');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [navigate]);

  if (loading) {
    return (
      <div className="pageContainer">
        <div className="loading-spinner">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pageContainer">
        <div className="error-message">
          Error: {error}
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const selectedProject = projects.find(project => project._id === projectId);

  return (
    <div className='projectPageContainer2'>
      <h1>Your Current Projects</h1>
      <Link to="/create-project" className="create-project-button2">
        Add New Project
      </Link>
      
      <div className='projectsMainContainer2'>
        {/* Projects List Column */}
        <div className='projectsContainer12'>
          <h2>Projects</h2>
          {projects.map((project) => (
            <Link 
              to={`/projects/${project._id}`}
              key={project._id}
              className='projectLink2'
            >
              <div className={`projectContainer12 ${projectId === project._id ? 'active2' : ''}`}>
                {project.name}
                <div className={`statusContainer12 ${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {project.status}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Project Details Column */}
        {selectedProject && (
          <div className='projectDetailsContainer12'>
            <div className='project-header-container2'>
              <div className='projectHeader12'>{selectedProject.name}</div>
              <Link 
                to={`/projects/${selectedProject._id}/tasks`} 
                className="view-project-button2"
              >
                View Full Project
              </Link>
            </div>
            
            <div className='detailsRow12'>
              <div className='tasksContainer12'>
                <h3>Tasks</h3>
                {selectedProject.tasks && selectedProject.tasks.length > 0 ? (
                  selectedProject.tasks.slice(0, 5).map((task) => (
                    <div key={task._id} className='taskContainer12'>
                      {task.name}
                      <div className={`statusContainer12 ${task.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {task.status}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No tasks yet</p>
                )}
              </div>

              <div className='subMainContainer12'>
                <div className='projectDescriptionContainer12'>
                  <h3>Project Description</h3>
                  <p>{selectedProject.description || 'No description available'}</p>
                </div>

                <div className='membersContainer12'>
                  <h3>Members</h3>
                  {selectedProject.members && selectedProject.members.length > 0 ? (
                    selectedProject.members.map((member) => (
                      <div key={member._id || member.user?._id} className='memberContainer12'>
                        <div className='memberName2'>{member.user?.name || member.name || 'Unknown member'}</div>
                        <div className='roleContainer12'>{member.role || 'Member'}</div>
                      </div>
                    ))
                  ) : (
                    <p>No members yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProjectsPage;