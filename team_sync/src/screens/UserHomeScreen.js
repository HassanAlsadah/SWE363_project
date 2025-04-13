import React from 'react';
import './UserHomeScreen.css';
import { ProjectsData } from '../data/projectsData';
import { Link } from 'react-router-dom';

function UserHomeScreen() {
    return (
        <div className='pageContainer'>
            <h1>Home Page</h1>
            <div className='itemsContainer'>
                <div className='projectsContainer'>
                    <div className='sectionTitle'>Projects</div>
                    {ProjectsData.map((item, index) => {
                        return (
                            <Link to={item.path}>
                            <div key={index} className='projectContainer'>
                                {item.name}
                                <div className='statusContainer'>
                                    {item.status}
                                </div>
                                

                            </div></Link>
                        )
                    }

                    )}





                </div>
                <div className='tasksContainer'>
                    <div className='sectionTitle'>Tasks</div>
                    <div className='taskContainer'></div>
                </div>
                <div className='chatsContainer'>
                    <div className='sectionTitle'>Chats</div>
                    <div className='chatContainer'>
                        Hassan

                    </div>
                </div>

            </div>
        </div>
    );
}

export default UserHomeScreen;