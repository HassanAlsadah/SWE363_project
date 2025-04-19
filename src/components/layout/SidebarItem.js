// components/Sidebar/SidebarItem.js
import React from 'react';

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div className={`sidebar-item ${active ? 'active' : ''}`} onClick={onClick}>
    <div className="icon">{icon}</div>
    <span>{label}</span>
  </div>
);

export default SidebarItem;
