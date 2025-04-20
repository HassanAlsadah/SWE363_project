import React from 'react';
import { Link, useParams } from 'react-router-dom';
import "../styles/UserProjectsscreen.css"
import { ProjectsData } from '../data/projectsData';

function UserProjectsPage() {
  const { projectId } = useParams();
  const selectedProject = ProjectsData.find(project => project.id.toString() === projectId);

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
          {ProjectsData.map((project) => (
            <Link 
              to={`/projects/${project.id}`}
              key={project.id}
              className='projectLink2'
            >
              <div className={`projectContainer12 ${projectId === project.id.toString() ? 'active2' : ''}`}>
                {project.name}
                <div className='statusContainer12'>
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
                to={`/projects/${selectedProject.id}/tasks`} 
                className="view-project-button2"
              >
                View Full Project
              </Link>
            </div>
            
            <div className='detailsRow12'>
              <div className='tasksContainer12'>
                <h3>Tasks</h3>
                {selectedProject.tasks.map((task) => (
                  <div key={task.id} className='taskContainer12'>
                    {task.taskName}
                    <div className={`statusContainer12 ${task.status.replace(/\s+/g, '')}`}>
                      {task.status}
                    </div>
                  </div>
                ))}
              </div>

              <div className='subMainContainer12'>
                <div className='projectDescriptionContainer12'>
                  <h3>Project Description</h3>
                  <p>{selectedProject.description}</p>
                </div>

                <div className='membersContainer12'>
                  <h3>Members</h3>
                  {selectedProject.members.map((member) => (
                    <div key={member.id} className='memberContainer12'>
                      <div className='memberName2'>{member.name}</div>
                      <div className='roleContainer12'>{member.role}</div>
                    </div>
                  ))}
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
