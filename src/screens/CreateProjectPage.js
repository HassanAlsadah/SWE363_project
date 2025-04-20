import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectsData, addNewProject } from '../data/projectsData';
import '../styles/CreateProject.css';

// Available members data
const availableMembers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com' },
    { id: 5, name: 'David Brown', email: 'david@example.com' },
];

const CreateProject = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [members, setMembers] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Search functionality
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        const results = availableMembers.filter(member =>
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
        setShowDropdown(results.length > 0);
    }, [searchTerm]);

    const addMember = (member) => {
        if (!members.some(m => m.id === member.id)) {
            setMembers([...members, member]);
        }
        setSearchTerm('');
        setShowDropdown(false);
    };

    const removeMember = (id) => {
        setMembers(members.filter(member => member.id !== id));
    };

    const createProject = () => {
        // Validation
        if (!projectName.trim()) {
            setError('Project name is required');
            return;
        }
        if (members.length === 0) {
            setError('Please add at least one team member');
            return;
        }

        // Generate new project ID
        const newId = Math.max(...ProjectsData.map(p => parseInt(p.id)), 0) + 1;

        const newProject = {
            id: newId.toString(),
            name: projectName.trim(),
            status: "pending",
            description: description.trim(),
            tasks: [],
            members: members.map((member, index) => ({
                id: `m${newId}${index}`,
                name: member.name,
                role: index === 0 ? "Project Lead" : "Team Member",
                isLeader: index === 0
            }))
        };

        // Add to projects data
        addNewProject(newProject);
        
        // Reset form and navigate
        setProjectName('');
        setDescription('');
        setMembers([]);
        setError('');
        alert(`Project "${newProject.name}" created successfully!`);
        navigate('/projects');
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
                                            key={member.id}
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
                                <li key={member.id}>
                                    <div>
                                        <span>{member.name}</span>
                                        <span className="member-role">
                                            {index === 0 ? ' (Project Lead)' : ' (Member)'}
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => removeMember(member.id)}
                                        className="remove-btn"
                                    >
                                        ×
                                    </button>
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