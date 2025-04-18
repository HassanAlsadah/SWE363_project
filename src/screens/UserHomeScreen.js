import React from 'react';
import './UserHomeScreen.css';
import { ProjectsData } from '../data/projectsData';
import { TasksData } from '../data/TasksData';
import { Link } from 'react-router-dom';

function UserHomeScreen() {
    // Get recent tasks (first 3 of each status)
    const pendingTasks = TasksData.filter(task => task.status === "Pending").slice(0, 3);
    const inProgressTasks = TasksData.filter(task => task.status === "In progress").slice(0, 3);
    const recentTasks = [...pendingTasks, ...inProgressTasks].slice(0, 3);

    return (
        <div className='pageContainer'>
            <h1>Home Page</h1>
            <div className='itemsContainer'>
                <div className='projectsContainer'>
                    <div className='sectionTitle'>My Projects</div>
                    {ProjectsData.map((project) => (
                        <Link to={project.path} key={project.id}>
                            <div className='projectContainer'>
                                {project.name}
                                <div className={`statusContainer ${project.status.toLowerCase().replace(' ', '-')}`}>
                                    {project.status}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                
                <div className='tasksContainer'>
                    <div className='sectionTitle'>Recent Tasks</div>
                    {recentTasks.length > 0 ? (
                        recentTasks.map((task) => (
                            <Link to={task.path} key={task.id}>
                                <div className='taskContainer'>
                                    {task.name}
                                    <div className={`statusContainer ${task.status.toLowerCase().replace(' ', '-')}`}>
                                        {task.projectName}
                                    </div>
                                    <div className='taskDueDate'>
                                        Due: {task.dueDate}
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className='taskContainer'>
                            No recent tasks
                            <div className='statusContainer'>
                                -
                            </div>
                        </div>
                    )}
                </div>

                <div className='chatsContainer'>
                    <div className='sectionTitle'>Recent Chats</div>
                    <div className='chatContainer'>
                        Hassan Ahmed
                        <div className='statusContainer online'>
                            Online
                        </div>
                    </div>
                    <div className='chatContainer'>
                        Sarah Johnson
                        <div className='statusContainer'>
                            Offline
                        </div>
                    </div>
                    <div className='chatContainer'>
                        Michael Brown
                        <div className='statusContainer online'>
                            Online
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserHomeScreen;