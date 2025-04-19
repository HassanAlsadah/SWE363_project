// components/Tasks/TasksPage.js
import React, { useState } from 'react';
import './Tasks.css';

const TasksPage = ({ tasks, members, isProjectManager, handleAddTask, handleDeleteTask, handleSaveEditTask }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', assignedTo: '', status: 'Not Started', deadline: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleSaveNewTask = () => {
    if (newTask.title && newTask.assignedTo && newTask.deadline) {
      handleAddTask(newTask);
      setNewTask({ title: '', assignedTo: '', status: 'Not Started', deadline: '' });
      setShowAddForm(false);
    } else {
      alert('Title, Assigned To, and Deadline are required!');
    }
  };

  return (
    <div className="tasks-page">
      <div className="table-header">
        <h2>Tasks Management</h2>
        {isProjectManager && (
          <button onClick={() => setShowAddForm(true)} className="add-button">
            Add New Task
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="add-form">
          <h3>Add New Task</h3>
          <div className="form-grid">
            <input type="text" placeholder="Title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
            <select value={newTask.assignedTo} onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })}>
              <option value="">Select Team Member</option>
              {members.map(member => <option key={member.id} value={member.name}>{member.name}</option>)}
            </select>
            <select value={newTask.status} onChange={e => setNewTask({ ...newTask, status: e.target.value })}>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input type="date" value={newTask.deadline} onChange={e => setNewTask({ ...newTask, deadline: e.target.value })} />
          </div>
          <div className="form-actions">
            <button onClick={() => setShowAddForm(false)} className="cancel">Cancel</button>
            <button onClick={handleSaveNewTask} className="save">Save</button>
          </div>
        </div>
      )}

      <table className="tasks-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>
                {editingTaskId === task.id ? (
                  <input defaultValue={task.title} onChange={e => task.title = e.target.value} />
                ) : (
                  task.title
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <select defaultValue={task.assignedTo} onChange={e => task.assignedTo = e.target.value}>
                    {members.map(member => <option key={member.id} value={member.name}>{member.name}</option>)}
                  </select>
                ) : (
                  task.assignedTo
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <select defaultValue={task.status} onChange={e => task.status = e.target.value}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  <span className={`status ${task.status.replace(/ /g, '-').toLowerCase()}`}>{task.status}</span>
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <input type="date" defaultValue={task.deadline} onChange={e => task.deadline = e.target.value} />
                ) : (
                  task.deadline
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <button onClick={() => { handleSaveEditTask(task.id, task); setEditingTaskId(null); }} className="save">Save</button>
                ) : (
                  <>
                    <button onClick={() => setEditingTaskId(task.id)} className="edit">Edit</button>
                    <button onClick={() => handleDeleteTask(task.id)} className="delete">Delete</button>
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

export default TasksPage;
