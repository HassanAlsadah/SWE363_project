import React, { useState } from 'react';
import './CreateProject.css';
import { students } from './studentsData';

const CreateProject = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState([]);
  const [description, setDescription] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredStudents = students.filter(student =>
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addMember = (student) => {
    if (!members.some(m => m.id === student.id)) {
      setMembers([...members, student]);
    }
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const removeMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
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
          <div className="dropdown-container">
            <div className="input-group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Search by name or email"
              />
              <button>🔍</button>
            </div>
            {isDropdownOpen && (
              <div className="dropdown">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(student => (
                    <div 
                      key={student.id} 
                      className="dropdown-item"
                      onClick={() => addMember(student)}
                    >
                      {student.name} - {student.email}
                    </div>
                  ))
                ) : (
                  <div className="dropdown-item no-results">No students found</div>
                )}
              </div>
            )}
          </div>
          <div className="member-list">
            {members.map(member => (
              <div key={member.id} className="member-item">
                <span>{member.name} ({member.email})</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMember(member.id);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
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
