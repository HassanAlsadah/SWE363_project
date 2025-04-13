import React from 'react';
import './UserHomeScreen.css';
import { Link } from 'react-router-dom';
import { TasksData } from '../data/TasksData';

function UserTasksScreen() {
    return (
        <div className='pageContainer'>
            <h1>My Tasks</h1>
            <div className='itemsContainer'>
                <div className='projectsContainer'>
                    <div className='sectionTitle'>Pending</div>
                    {TasksData.map((item, index) => {
                        if (item.status=="Pending"){
                        return (
                            <Link to={item.path}>
                            <div key={index} className='projectContainer'>
                                {item.name}
                                <div className='statusContainer'>
                                    {item.projectName}
                                </div>
                            </div></Link>
                        )}
                    })}

                </div>
                <div className='tasksContainer'>
                    <div className='sectionTitle'>In progress</div>
                    {TasksData.map((item, index) => {
                        if (item.status=="In progress"){
                        return (
                            <Link to={item.path}>
                            <div key={index} className='projectContainer'>
                                {item.name}
                                <div className='statusContainer'>
                                    {item.projectName}
                                </div>
                            </div></Link>
                        )}
                    })}
                </div>
                <div className='chatsContainer'>
                    <div className='sectionTitle'>Completed</div>
                    {TasksData.map((item, index) => {
                        if (item.status=="Completed"){
                        return (
                            <Link to={item.path}>
                            <div key={index} className='projectContainer'>
                                {item.name}
                                <div className='statusContainer'>
                                    {item.projectName}
                                </div>
                            </div></Link>
                        )}
                    })}
                </div>

            </div>
        </div>
    );
}

export default UserTasksScreen;