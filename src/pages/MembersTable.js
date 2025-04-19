// components/Projects/MembersTable.js
import React, { useState } from 'react';
import './Projects.css';

const MembersTable = ({ members, isProjectManager, onAddMember, onEditMember, onDeleteMember }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    availableTime: [],
    assignedTasks: []
  });

  const handleSaveMember = () => {
    if (newMember.name && newMember.email) {
      onAddMember(newMember);
      setNewMember({ name: '', email: '', phone: '', availableTime: [], assignedTasks: [] });
      setShowAddForm(false);
    } else {
      alert('Name and Email are required!');
    }
  };

  return (
    <div className="members-table">
      <div className="table-header">
        <h2>Team Members</h2>
        {isProjectManager && (
          <button onClick={() => setShowAddForm(true)} className="add-button">
            Add New Member
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="add-form">
          <h3>Add New Member</h3>
          <div className="form-grid">
            <input type="text" placeholder="Name" value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} />
            <input type="email" placeholder="Email" value={newMember.email} onChange={e => setNewMember({ ...newMember, email: e.target.value })} />
            <input type="text" placeholder="Phone" value={newMember.phone} onChange={e => setNewMember({ ...newMember, phone: e.target.value })} />
          </div>
          <div className="form-actions">
            <button onClick={() => setShowAddForm(false)} className="cancel">Cancel</button>
            <button onClick={handleSaveMember} className="save">Save Member</button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{member.assignedTasks?.length ? `${member.assignedTasks.length} tasks` : 'No tasks'}</td>
              <td>
                {isProjectManager && (
                  <>
                    <button onClick={() => onEditMember(member.id)} className="edit">Edit</button>
                    <button onClick={() => onDeleteMember(member.id)} className="delete">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTable;
