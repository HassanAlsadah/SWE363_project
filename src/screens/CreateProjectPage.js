import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../utils/api';
import '../styles/CreateProject.css';

const CreateProject = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUserAndMembers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const apiClient = axios.create({
          baseURL: api.baseUrl,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // Fetch current user first
        const userResponse = await apiClient.get(api.auth.me);
        const currentUser = userResponse.data.data || userResponse.data;
        setCurrentUser(currentUser);

        // Then fetch all users
        const membersResponse = await apiClient.get(api.users.getAll);
        let allMembers = membersResponse.data.data || membersResponse.data;

        // Filter out current user from available members
        allMembers = allMembers.filter(member => 
          member._id !== currentUser._id && member.email !== currentUser.email
        );

        if (allMembers && allMembers.length) {
          setAvailableMembers(allMembers);
        } else {
          setAvailableMembers([]);
          setError('No other members available to add.');
        }

        // Automatically add current user as project lead
        if (currentUser) {
          setMembers([{
            _id: currentUser._id,
            name: currentUser.name,
            email: currentUser.email,
            role: 'Project Lead'
          }]);
        }

      } catch (err) {
        console.error('Error fetching data:', err);
        setAvailableMembers([]);
        setError('Failed to load user data');
      }
    };

    fetchCurrentUserAndMembers();
  }, [navigate]);

  useEffect(() => {
    if (!availableMembers || searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = availableMembers.filter(member =>
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setShowDropdown(results.length > 0);
  }, [searchTerm, availableMembers]);

  const addMember = (member) => {
    if (!members.some(m => m._id === member._id)) {
      setMembers([...members, {
        ...member,
        role: 'Member'
      }]);
    }
    setSearchTerm('');
    setShowDropdown(false);
  };

  const removeMember = (id) => {
    // Prevent removing the current user (project lead)
    if (currentUser && id === currentUser._id) return;
    setMembers(members.filter(member => member._id !== id));
  };

  const createProject = async () => {
    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const apiClient = axios.create({
        baseURL: api.baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Create project with current user as creator
      const projectResponse = await apiClient.post(api.projects.create, {
        name: projectName.trim(),
        description: description.trim(),
        status: 'Planning',
        createdBy: currentUser._id
      });

      const newProject = projectResponse.data;

      // Add all members (including current user)
      for (let member of members) {
        await apiClient.post(api.projects.addMember(newProject._id), {
          user: member._id,
          role: member.role === 'Project Lead' ? 'Admin' : 'Member',
        });
      }

      setProjectName('');
      setDescription('');
      setError('');
      alert(`Project "${newProject.name}" created successfully!`);
      navigate('/projects');
    } catch (err) {
      console.error('Error creating project:', err);
      setError(err.response?.data?.message || 'Failed to create project');
    }
  };

  return (
    <div className="project-container">
      <h1>Create Project</h1>
      {error && <div className="error-message">{error}</div>}

      <div className="panels">
        <div className="panel">
          <h2>Project Information</h2>
          <div className="form-group">
            <label>Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description..."
            />
          </div>
        </div>

        <div className="panel">
          <h2>Team Members</h2>
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search members by name or email"
              onFocus={() => searchTerm && setShowDropdown(true)}
            />
            {showDropdown && (
              <div className="dropdown">
                {searchResults.length > 0 ? (
                  searchResults.map(member => (
                    <div
                      key={member._id}
                      className="dropdown-item"
                      onClick={() => addMember(member)}
                    >
                      <span className="member-name">{member.name}</span>
                      <span className="member-email">{member.email}</span>
                    </div>
                  ))
                ) : (
                  <div className="dropdown-empty">No matching members found</div>
                )}
              </div>
            )}
          </div>

          <h3>Current Team</h3>
          {members.length === 0 ? (
            <p className="no-members">No members added yet</p>
          ) : (
            <ul className="member-list">
              {members.map((member, index) => (
                <li key={member._id}>
                  <div>
                    <span>{member.name}</span>
                    <span className="member-role"> ({member.role})</span>
                  </div>
                  {member.role !== 'Project Lead' && (
                    <button
                      onClick={() => removeMember(member._id)}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        className="create-btn"
        onClick={createProject}
      >
        Create Project
      </button>
    </div>
  );
};

export default CreateProject;