import React from 'react';
import '../styles/UserHomeScreen.css';
import { Link } from 'react-router-dom';
import { TasksData } from '../data/TasksData';

function UserTasksScreen() {
    return (
        <div className='pageContainer'>
            <h1>My Tasks</h1>
            <div className='itemsContainer'>
                <div className='projectsContainer'>
                    <div className='sectionTitle'>Pending</div>
                    {TasksData.filter(item => item.status === "Pending").map((item, index) => (
                        <Link to={item.path} key={index}>
                            <div className='projectContainer'>
                                {item.name}
                                <div className='statusContainer pending'>
                                    {item.projectName}
                                </div>
                                <div style={{ fontSize: '12px', color: '#666' }}>
                                    Due: {item.dueDate}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className='tasksContainer'>
                    <div className='sectionTitle'>In Progress</div>
                    {TasksData.filter(item => item.status === "In progress").map((item, index) => (
                        <Link to={item.path} key={index}>
                            <div className='projectContainer'>
                                {item.name}
                                <div className='statusContainer in-progress'>
                                    {item.projectName}
                                </div>
                                <div style={{ fontSize: '12px', color: '#666' }}>
                                    Due: {item.dueDate}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className='chatsContainer'>
                    <div className='sectionTitle'>Completed</div>
                    {TasksData.filter(item => item.status === "Completed").map((item, index) => (
                        <Link to={item.path} key={index}>
                            <div className='projectContainer'>
                                {item.name}
                                <div className='statusContainer completed'>
                                    {item.projectName}
                                </div>
                                <div style={{ fontSize: '12px', color: '#666' }}>
                                    Completed: {item.completedDate}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserTasksScreen;