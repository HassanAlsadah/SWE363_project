// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import TasksPage from './pages/TasksPage';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';

import { projects as initialProjects } from './data/dummyProjects';
import { members as initialMembers } from './data/dummyMembers';
import { tasks as initialTasks } from './data/dummyTasks';

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [projects, setProjects] = useState(initialProjects);
  const [members, setMembers] = useState(initialMembers);
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [isProjectManager] = useState(true);

  const handleEditDescription = () => {
    const updatedDescription = prompt('Update project description:', selectedProject.description);
    if (updatedDescription) {
      const updatedProject = { ...selectedProject, description: updatedDescription };
      setSelectedProject(updatedProject);
      setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p));
    }
  };

  const handleAddMember = (newMemberData) => {
    const newMemberId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
    const memberToAdd = { ...newMemberData, id: newMemberId };
    setMembers([...members, memberToAdd]);
  };

  const handleEditMember = (memberId) => {
    const member = members.find(m => m.id === memberId);
    if (member) {
      const updatedName = prompt('Update member name:', member.name);
      const updatedEmail = prompt('Update member email:', member.email);
      const updatedPhone = prompt('Update member phone:', member.phone);

      if (updatedName && updatedEmail) {
        const updatedMember = {
          ...member,
          name: updatedName,
          email: updatedEmail,
          phone: updatedPhone || member.phone
        };
        setMembers(members.map(m => m.id === memberId ? updatedMember : m));
      }
    }
  };

  const handleDeleteMember = (memberId) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter(m => m.id !== memberId));
    }
  };

  const handleAddTask = (newTaskData) => {
    const newTaskId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const taskToAdd = { ...newTaskData, id: newTaskId };
    setTasks([...tasks, taskToAdd]);

    setMembers(members.map(m =>
      m.name === newTaskData.assignedTo
        ? { ...m, assignedTasks: [...m.assignedTasks, newTaskData.title] }
        : m
    ));
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const taskToDelete = tasks.find(t => t.id === taskId);
      setTasks(tasks.filter(t => t.id !== taskId));

      if (taskToDelete) {
        setMembers(members.map(m =>
          m.name === taskToDelete.assignedTo
            ? { ...m, assignedTasks: m.assignedTasks.filter(t => t !== taskToDelete.title) }
            : m
        ));
      }
    }
  };

  const handleSaveEditTask = (taskId, updatedData) => {
    const originalTask = tasks.find(t => t.id === taskId);
    setTasks(tasks.map(t => t.id === taskId ? { ...t, ...updatedData } : t));

    if (originalTask && originalTask.assignedTo !== updatedData.assignedTo) {
      setMembers(members.map(m => {
        if (m.name === originalTask.assignedTo) {
          return { ...m, assignedTasks: m.assignedTasks.filter(t => t !== originalTask.title) };
        } else if (m.name === updatedData.assignedTo) {
          return { ...m, assignedTasks: [...m.assignedTasks, updatedData.title || originalTask.title] };
        }
        return m;
      }));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              {activeView === 'dashboard' && 'Dashboard'}
              {activeView === 'projects' && 'Project Management'}
              {activeView === 'tasks' && 'Tasks Management'}
              {activeView === 'chat' && 'Team Chat'}
              {activeView === 'settings' && 'Settings'}
            </h1>
            <button className="text-gray-600 hover:text-gray-900">Logout</button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {activeView === 'dashboard' && (
            <Dashboard project={selectedProject} members={members} tasks={tasks} />
          )}
          {activeView === 'projects' && (
            <ProjectsPage
              project={selectedProject}
              members={members}
              isProjectManager={isProjectManager}
              handleEditDescription={handleEditDescription}
              handleAddMember={handleAddMember}
              handleEditMember={handleEditMember}
              handleDeleteMember={handleDeleteMember}
            />
          )}
          {activeView === 'tasks' && (
            <TasksPage
              tasks={tasks}
              members={members}
              isProjectManager={isProjectManager}
              handleAddTask={handleAddTask}
              handleDeleteTask={handleDeleteTask}
              handleSaveEditTask={handleSaveEditTask}
            />
          )}
          {activeView === 'chat' && <ChatPage />}
          {activeView === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
};

export default App;