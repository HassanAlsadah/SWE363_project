// components/Projects/ProjectsPage.js
import React from 'react';
import MembersTable from './MembersTable';
import './Projects.css';

const ProjectsPage = ({ 
  project, 
  members, 
  isProjectManager, 
  handleEditDescription, 
  handleAddMember, 
  handleEditMember, 
  handleDeleteMember 
}) => {
  return (
    <div className="projects-page">
      <div className="project-details-card">
        <div className="card-header">
          <h2>Project Details</h2>
          {isProjectManager && (
            <button onClick={handleEditDescription} className="edit-button">
              Edit
            </button>
          )}
        </div>
        <div className="project-info">
          <p><strong>Project:</strong> {project.name}</p>
          <p><strong>Description:</strong> {project.description}</p>
        </div>
      </div>

      <MembersTable 
        members={members}
        isProjectManager={isProjectManager}
        onAddMember={handleAddMember}
        onEditMember={handleEditMember}
        onDeleteMember={handleDeleteMember}
      />
    </div>
  );
};

export default ProjectsPage;
