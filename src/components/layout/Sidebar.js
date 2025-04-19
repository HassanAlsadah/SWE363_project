// components/Sidebar/Sidebar.js
import React from 'react';
import { Users, Home, List, MessageSquare, Settings } from 'lucide-react';
import SidebarItem from './SidebarItem';
import './Sidebar.css';

const Sidebar = ({ activeView, setActiveView }) => (
  <div className="sidebar">
    <div className="sidebar-header">TeamSync</div>
    <div className="sidebar-items">
      <SidebarItem icon={<Home size={20} />} label="Home" active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
      <SidebarItem icon={<Users size={20} />} label="Projects" active={activeView === 'projects'} onClick={() => setActiveView('projects')} />
      <SidebarItem icon={<List size={20} />} label="My Tasks" active={activeView === 'tasks'} onClick={() => setActiveView('tasks')} />
      <SidebarItem icon={<MessageSquare size={20} />} label="Chat" active={activeView === 'chat'} onClick={() => setActiveView('chat')} />
      <SidebarItem icon={<Settings size={20} />} label="Settings" active={activeView === 'settings'} onClick={() => setActiveView('settings')} />
    </div>
    <div className="sidebar-footer">
      <div className="profile-icon">PM</div>
      <div>
        <div className="profile-name">Project Manager</div>
        <div className="profile-email">admin@teamsync.com</div>
      </div>
    </div>
  </div>
);

export default Sidebar;
