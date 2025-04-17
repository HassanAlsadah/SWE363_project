import React, { useState } from 'react';
import './CreateProject.css';

const CreateProject = () => {
  const [username, setUsername] = useState('');
  const [members, setMembers] = useState([]);
  const [description, setDescription] = useState('');

  const addMember = () => {
    if (username.trim()) {
      setMembers([...members, username.trim()]);
      setUsername('');
    }
  };

  const confirmDescription = () => {
    alert('Description confirmed!');
  };

  const createProject = () => {
    alert('Project created!');
    console.log('Members:', members);
    console.log('Description:', description);
  };

  return (
    <div className="project-container">
      <h1>Create Project</h1>
      <div className="panels">
        <div className="panel">
          <h2>Add Members</h2>
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter member's username"
            />
            <button onClick={addMember}>🔍</button>
          </div>
          <ul className="member-list">
            {members.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h2>Edit Project description</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type project description..."
          />
          <button className="confirm" onClick={confirmDescription}>Confirm</button>
        </div>
      </div>
      <button className="create-btn" onClick={createProject}>Create Project</button> 
    </div>
  );
};

export default CreateProject;
