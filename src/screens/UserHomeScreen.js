import React from 'react';
import '../styles/UserHomeScreen.css';
import { ProjectsData } from '../data/projectsData';
import { TasksData } from '../data/TasksData';
import { chats } from '../data/chatsData';
import { Link } from 'react-router-dom';

function UserHomeScreen() {
    // Get recent tasks (first 3 of each status)
    const pendingTasks = TasksData.filter(task => task.status === "Pending").slice(0, 3);
    const inProgressTasks = TasksData.filter(task => task.status === "In progress").slice(0, 3);
    const recentTasks = [...pendingTasks, ...inProgressTasks].slice(0, 3);

    // Get recent chats (first 3)
    const recentChats = chats.slice(0, 3);

    return (
        <div className='pageContainer'>
            <h1>Home Page</h1>
            <div className='itemsContainer'>
                <div className='projectsContainer'>
                    <div className='sectionTitle'>My Projects</div>
                    {ProjectsData.map((project) => (
                        <Link to={`/projects/${project.id}`} key={project.id}>
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
                    {recentChats.map((chat) => (
                        <Link to={`/chat/${chat.id}`} key={chat.id} state={{ chat }}>
                            <div className='chat-card'>
                                <div className='chat-avatar'>{chat.name.charAt(0)}</div>
                                <div className='chat-content'>
                                    <div className='chat-header'>
                                        <strong>{chat.name}</strong>
                                        <span className='chat-time'>
                                            {chat.messages?.length > 0 
                                                ? chat.messages[chat.messages.length - 1].time 
                                                : ''}
                                        </span>
                                    </div>
                                    <p className='chat-preview'>
                                        {chat.messages?.length > 0 
                                            ? `${chat.messages[chat.messages.length - 1].sender.split(' ')[0]}: ${chat.messages[chat.messages.length - 1].text}`
                                            : 'No messages yet'}
                                    </p>
                                    {chat.project && <span className='chat-project'>{chat.project}</span>}
                                </div>
                                {chat.unread > 0 && <div className='unread-badge'>{chat.unread}</div>}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserHomeScreen;