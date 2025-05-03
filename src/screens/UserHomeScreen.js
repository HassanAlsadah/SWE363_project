import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/UserHomeScreen.css';
import axios from 'axios';
import { api } from '../utils/api';

function UserHomeScreen() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const apiClient = axios.create({
          baseURL: api.baseUrl,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const [projectsRes, tasksRes, chatsRes] = await Promise.all([
          apiClient.get(api.projects.getUserProjects),
          apiClient.get(api.tasks.getUserTasks),
          apiClient.get(api.chats.getUserChats)
        ]);

        setProjects(projectsRes.data.data || projectsRes.data);
        setTasks(tasksRes.data.data || tasksRes.data);
        setChats(chatsRes.data.data || chatsRes.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch data');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="pageContainer">
        <div className="loading-spinner">Loading your dashboard...</div>
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

  const pendingTasks = tasks.filter(task => 
    task.status === "Pending" || 
    task.status === "Not Started" ||
    task.status === "Open"
  ).slice(0, 3);
  
  const inProgressTasks = tasks.filter(task => 
    task.status === "In progress" || 
    task.status === "In Progress" ||
    task.status === "Active"
  ).slice(0, 3);
  
  const recentTasks = [...pendingTasks, ...inProgressTasks].slice(0, 3);
  const recentChats = chats.slice(0, 3);

  return (
    <div className='pageContainer'>
      <h1>Dashboard</h1>
      <div className='itemsContainer'>
        {/* Projects Section */}
        <div className='projectsContainer'>
          <div className='sectionTitle'>My Projects</div>
          {projects.length > 0 ? (
            projects.map((project) => (
              <Link to={`/projects/${project._id}`} key={project._id}>
                <div className='projectContainer'>
                  <h3>{project.name}</h3>
                  <div className={`statusContainer ${(project.status || '').toLowerCase().replace(/\s+/g, '-')}`}>
                    {project.status || 'No status'}
                  </div>
                  <div className="project-meta">
                    <span>{project.tasks?.length || 0} tasks</span>
                    <span>{project.members?.length || 0} members</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className='projectContainer empty-state'>
              <p>No projects yet</p>
              <Link to="/projects/new" className="create-link">
                + Create New Project
              </Link>
            </div>
          )}
        </div>
        
        {/* Tasks Section */}
        <div className='tasksContainer'>
          <div className='sectionTitle'>Recent Tasks</div>
          {recentTasks.length > 0 ? (
            recentTasks.map((task) => (
              <Link 
                to={`/projects/${task.project?._id || task.project}/tasks/${task._id}`} 
                key={task._id}
              >
                <div className='taskContainer'>
                  <h4>{task.name || task.taskName}</h4>
                  <div className="task-meta">
                    <span className={`status-badge ${(task.status || '').toLowerCase().replace(/\s+/g, '-')}`}>
                      {task.status || 'No status'}
                    </span>
                    <span className="project-name">
                      {task.project?.name || 'No project'}
                    </span>
                  </div>
                  <div className='taskDueDate'>
                    Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                    {task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Completed' && (
                      <span className="overdue-badge">Overdue</span>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className='taskContainer empty-state'>
              <p>No recent tasks</p>
              {projects.length > 0 ? (
                <Link to={`/projects/${projects[0]._id}/tasks/new`} className="create-link">
                  + Add New Task
                </Link>
              ) : (
                <Link to="/projects/new" className="create-link">
                  Create Project First
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Chats Section */}
        <div className='chatsContainer'>
          <div className='sectionTitle'>Recent Chats</div>
          {recentChats.length > 0 ? (
            recentChats.map((chat) => (
              <Link to={`/chat/${chat._id}`} key={chat._id} state={{ chat }}>
                <div className='chat-card'>
                  <div className='chat-avatar'>
                    {chat.name?.charAt(0).toUpperCase() || 'C'}
                  </div>
                  <div className='chat-content'>
                    <div className='chat-header'>
                      <strong>{chat.name || 'Unnamed Chat'}</strong>
                      <span className='chat-time'>
                        {chat.lastMessage?.time ? 
                          new Date(chat.lastMessage.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 
                          'No messages'}
                      </span>
                    </div>
                    <p className='chat-preview'>
                      {chat.lastMessage 
                        ? `${chat.lastMessage.sender?.split(' ')[0] || 'Someone'}: ${chat.lastMessage.text?.substring(0, 30) || ''}${chat.lastMessage.text?.length > 30 ? '...' : ''}`
                        : 'No messages yet'}
                    </p>
                    {chat.project && (
                      <span className='chat-project'>
                        {chat.project.name || chat.project}
                      </span>
                    )}
                  </div>
                  {chat.unread > 0 && (
                    <div className='unread-badge'>
                      {chat.unread > 9 ? '9+' : chat.unread}
                    </div>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <div className='chat-card empty-state'>
              <p>No recent chats</p>
              {projects.length > 0 ? (
                <Link to={`/projects/${projects[0]._id}/chat`} className="create-link">
                  + Start New Chat
                </Link>
              ) : (
                <Link to="/projects/new" className="create-link">
                  Create Project First
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserHomeScreen;