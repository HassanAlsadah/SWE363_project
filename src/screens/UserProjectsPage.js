import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './UserProjectsscreen.css';
import { ProjectsData } from '../data/projectsData';

function UserProjectsPage() {
    const { projectId } = useParams();
    const selectedProject = ProjectsData.find(project => project.id === projectId);

    return (
        <div className='projectPageContainer'>
            <h1>Your Current Projects</h1>
            <button className='button1'>Add New Project</button>
            
            <div className='projectsMainContainer'>
                {/* Projects List Column */}
                <div className='projectsContainer1'>
                    <h2>Projects</h2>
                    {ProjectsData.map((project) => (
                        <Link 
                            to={`/projects/${project.id}`}
                            key={project.id}
                            className='projectLink'
                        >
                            <div className={`projectContainer1 ${projectId === project.id ? 'active' : ''}`}>
                                {project.name}
                                <div className='statusContainer1'>
                                    {project.status}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Project Details Column */}
                <div className='projectDetailsContainer1'>
                    {selectedProject ? (
                        <>
                            <div className='projectHeader1'>
                                {selectedProject.name}
                            </div>
                            
                            <div className='detailsRow1'>
                                <div className='tasksContainer1'>
                                    <h3>Tasks</h3>
                                    {selectedProject.tasks.map((task) => (
                                        <div key={task.id} className='taskContainer1'>
                                            {task.taskName}
                                            <div className={`statusContainer1 ${task.status.replace(/\s+/g, '')}`}>
                                                {task.status}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className='subMainContainer1'>
                                    <div className='projectDescriptionContainer1'>
                                        <h3>Project Description</h3>
                                        <p>{selectedProject.description}</p>
                                    </div>

                                    <div className='membersContainer1'>
                                        <h3>Members</h3>
                                        {selectedProject.members.map((member) => (
                                            <div key={member.id} className='memberContainer1'>
                                                <div className='memberName'>{member.name}</div>
                                                <div className='roleContainer1'>{member.role}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='projectHeader1'>
                            Select a project to view details
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProjectsPage;