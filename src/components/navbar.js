import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';
import '../styles/Navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Don't show navbar on login page
  if (location.pathname === '/login') return null;

  // Check if we're on signup page
  const isSignUpPage = location.pathname === '/signup';

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          {/* Back button (only show when not on home page) */}
          {location.pathname !== '/' && (
            <button className='nav-button' onClick={handleGoBack}>
              <FaIcons.FaArrowLeft />
            </button>
          )}
          
          {/* Menu button - hide on signup page */}
          {!isSignUpPage && (
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          )}
          
          {/* Logout button */}
          <button className='nav-button logout-button' onClick={handleLogout}>
            <FaIcons.FaSignOutAlt />
          </button>
        </div>
        
        {/* Sidebar - hide on signup page */}
        {!isSignUpPage && (
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
              <li className='nav-text'>
                <a onClick={handleLogout}>
                  <FaIcons.FaSignOutAlt />
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </IconContext.Provider>
    </>
  );
}

export default Navbar;