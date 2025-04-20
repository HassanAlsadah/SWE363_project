import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/TasksPage.css";
import { ProjectsData } from "../data/projectsData";

// Available members data
const availableMembers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com' },
  { id: 5, name: 'David Brown', email: 'david@example.com' },
];

function TasksPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [id, setId] = useState();
  const [memberId, setMemberId] = useState();
  const [projectDescription, setProjectDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [activeTab, setActiveTab] = useState("tasks");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const selectedProject = ProjectsData.find(
      (project) => project.id.toString() === projectId
    );
    if (selectedProject) {
      setTasks(selectedProject.tasks);
      setMembers(selectedProject.members);
      setProjectDescription(selectedProject.description);
      setProjectName(selectedProject.name);
    }
  }, [projectId]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = availableMembers.filter(member =>
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  function addTask(newTask) {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    
    // Update the project in ProjectsData
    const projectIndex = ProjectsData.findIndex(p => p.id.toString() === projectId);
    if (projectIndex !== -1) {
      ProjectsData[projectIndex].tasks = updatedTasks;
    }
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task, index) => index !== id);
    setTasks(updatedTasks);
    
    // Update the project in ProjectsData
    const projectIndex = ProjectsData.findIndex(p => p.id.toString() === projectId);
    if (projectIndex !== -1) {
      ProjectsData[projectIndex].tasks = updatedTasks;
    }
  }

  function addMember(newMember) {
    if (!members.some(m => m.id === newMember.id)) {
      const updatedMembers = [...members, {
        id: newMember.id,
        name: newMember.name,
        role: "Team Member",
        isLeader: false
      }];
      setMembers(updatedMembers);
      
      // Update the project in ProjectsData
      const projectIndex = ProjectsData.findIndex(p => p.id.toString() === projectId);
      if (projectIndex !== -1) {
        ProjectsData[projectIndex].members = updatedMembers;
      }
    }
    setSearchTerm("");
    setShowSearch(false);
  }

  function deleteMember(id) {
    const updatedMembers = members.filter((member, index) => index !== id);
    setMembers(updatedMembers);
    
    // Update the project in ProjectsData
    const projectIndex = ProjectsData.findIndex(p => p.id.toString() === projectId);
    if (projectIndex !== -1) {
      ProjectsData[projectIndex].members = updatedMembers;
    }
  }

  function DisplayDetils(id) {
    setId(id);
  }

  function DisplayMemberDetails(id) {
    setMemberId(id);
  }

  function editDescription() {
    document.getElementById("description").style.display = "none";
    document.getElementById("editDescription").style.display = "block";
    document.getElementById("done").style.display = "inline";
    document.getElementById("editDescription").value = projectDescription;
  }

  function Done() {
    const newDescription = document.getElementById("editDescription").value;
    setProjectDescription(newDescription);
    document.getElementById("description").style.display = "block";
    document.getElementById("editDescription").style.display = "none";
    document.getElementById("done").style.display = "none";
    
    // Update the project in ProjectsData
    const projectIndex = ProjectsData.findIndex(p => p.id.toString() === projectId);
    if (projectIndex !== -1) {
      ProjectsData[projectIndex].description = newDescription;
    }
  }

  function handleAddTaskClick() {
    navigate(`/projects/${projectId}/add-task`);
  }

  function CreateTask(props) {
    function handleClick(e) {
      e.stopPropagation();
      props.onDelete(props.id);
    }

    function details() {
      props.onClick(props.id);
    }

    return (
      <div className={`task-card ${props.status.toLowerCase().replace(' ', '-')}`} onClick={details}>
        <div className="task-card-header">
          <h3>{props.taskName}</h3>
          <span className={`status-badge ${props.status.toLowerCase().replace(' ', '-')}`}>
            {props.status}
          </span>
        </div>
        <p className="task-assigned">Assigned to: {props.assignedTo || "Unassigned"}</p>
        {props.deadline && <p className="task-deadline">Due: {new Date(props.deadline).toLocaleDateString()}</p>}
        <button className="delete-task-btn" onClick={handleClick}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    );
  }

  function TaskDetails(props) {
    return (
      <div className="task-details-container">
        <div className="task-details-header">
          <h2>{props.taskName}</h2>
          <span className={`status-badge large ${props.status.toLowerCase().replace(' ', '-')}`}>
            {props.status}
          </span>
        </div>
        
        <div className="detail-section">
          <h3>Task Description</h3>
          <p>{props.description || "No description provided"}</p>
        </div>
        
        <div className="detail-grid">
          <div className="detail-item">
            <h4>Assigned Member</h4>
            <p>{props.assignedTo || "Unassigned"}</p>
          </div>
          <div className="detail-item">
            <h4>Task Status</h4>
            <p>{props.status}</p>
          </div>
          <div className="detail-item">
            <h4>Created On</h4>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div className="detail-item">
            <h4>Task Deadline</h4>
            <p>{props.deadline ? new Date(props.deadline).toLocaleDateString() : "No deadline"}</p>
          </div>
        </div>
      </div>
    );
  }

  function MemberCard(props) {
    function handleClick(e) {
      e.stopPropagation();
      props.onDelete(props.id);
    }

    function showDetails() {
      props.onClick(props.id);
    }

    return (
      <div className="member-card" onClick={showDetails}>
        <div className="member-avatar">
          {props.name.charAt(0).toUpperCase()}
        </div>
        <div className="member-info">
          <h3>{props.name}</h3>
          <p>{props.role}</p>
          {props.isLeader && <span className="leader-badge">Team Leader</span>}
        </div>
        <button className="delete-member-btn" onClick={handleClick}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    );
  }

  function MemberSearch() {
    return (
      <div className="member-search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search members by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="cancel-search-btn"
            onClick={() => {
              setSearchTerm("");
              setShowSearch(false);
            }}
          >
            Cancel
          </button>
        </div>
        
        {searchResults.length > 0 ? (
          <div className="search-results">
            {searchResults.map(member => (
              <div 
                key={member.id} 
                className="search-result-item"
                onClick={() => addMember(member)}
              >
                <div className="member-avatar small">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div className="member-details">
                  <h4>{member.name}</h4>
                  <p>{member.email}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          searchTerm && <div className="no-results">No matching members found</div>
        )}
      </div>
    );
  }

  function AddMemberButton() {
    return (
      <button
        className="add-member-btn"
        onClick={() => setShowSearch(true)}
      >
        + Add New Member
      </button>
    );
  }

  function MemberDetails(props) {
    const assignedTasks = tasks.filter(task => task.assignedTo === props.name);
    
    const availableTimes = [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "10:00 AM - 6:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 3:00 PM" },
      { day: "Thursday", hours: "11:00 AM - 7:00 PM" },
      { day: "Friday", hours: "9:00 AM - 2:00 PM" }
    ];

    return (
      <div className="member-details-container">
        <div className="member-profile">
          <div className="member-avatar large">
            {props.name.charAt(0).toUpperCase()}
          </div>
          <div className="member-info">
            <h2>{props.name}</h2>
            <p className="member-role">{props.role}</p>
            {props.isLeader && <span className="leader-badge">Team Leader</span>}
          </div>
        </div>

        <div className="member-details-grid">
          <div className="member-contact-info">
            <h3>Contact Information</h3>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>{props.name.toLowerCase().replace(' ', '.')}@example.com</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+966 5{Math.floor(10000000 + Math.random() * 90000000)}</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Riyadh, Saudi Arabia</span>
            </div>
          </div>

          <div className="member-tasks">
            <h3>Assigned Tasks ({assignedTasks.length})</h3>
            {assignedTasks.length > 0 ? (
              <ul className="task-list">
                {assignedTasks.map((task, index) => (
                  <li key={index} className="task-item">
                    <span className={`task-status ${task.status.toLowerCase().replace(' ', '-')}`}>
                      {task.status}
                    </span>
                    <span className="task-name">{task.taskName}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-tasks">No tasks assigned</p>
            )}
          </div>

          <div className="member-availability">
            <h3>Available Times</h3>
            <ul className="availability-list">
              {availableTimes.map((time, index) => (
                <li key={index}>
                  <span className="day">{time.day}:</span>
                  <span className="hours">{time.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  function Task() {
    return (
      <div className="task-form-container">
        <button
          className="add-task-btn"
          onClick={handleAddTaskClick}
        >
          + Add New Task
        </button>
      </div>
    );
  }

  return (
    <div className="tasks-page-container">
      <div className="page-header">
        <h1>{projectName}</h1>
      </div>
      
      <div className="project-description-section">
        <div className="description-header">
          <h2>Project Description</h2>
          <button className="edit-btn" onClick={editDescription}>
            <i className="fas fa-edit"></i> Edit
          </button>
        </div>
        <p id="description" className="project-description">{projectDescription}</p>
        <textarea
          className="edit-description-input"
          id="editDescription"
        ></textarea>
        <button id="done" className="save-btn" onClick={Done}>
          Save Changes
        </button>
      </div>
      
      <div className="main-content-area">
        <div className="sidebar">
          <button 
            className={`sidebar-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <i className="fas fa-tasks"></i> Tasks
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'members' ? 'active' : ''}`}
            onClick={() => setActiveTab('members')}
          >
            <i className="fas fa-users"></i> Members
          </button>
        </div>
        
        {activeTab === 'tasks' ? (
          <div className="tasks-container">
            <div className="tasks-list-container">
              <h2>Task List</h2>
              <div className="tasks-list-scrollable">
                {tasks.map((task, index) => (
                  <CreateTask
                    onClick={DisplayDetils}
                    key={index}
                    id={index}
                    taskId={task.id}
                    description={task.description}
                    assignedTo={task.assignedTo}
                    status={task.status}
                    taskName={task.taskName}
                    deadline={task.deadline}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
              <Task />
            </div>
            
            <div className="task-details-scrollable">
              {id !== undefined && tasks[id] ? (
                <TaskDetails
                  id={id}
                  taskId={tasks[id].id}
                  description={tasks[id].description}
                  assignedTo={tasks[id].assignedTo}
                  status={tasks[id].status}
                  taskName={tasks[id].taskName}
                  deadline={tasks[id].deadline}
                />
              ) : (
                <div className="no-task-selected">
                  <i className="fas fa-hand-pointer"></i>
                  <p>Select a task to view details</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="members-container">
            <div className="members-list-container">
              <h2>Team Members</h2>
              <div className="members-list-scrollable">
                {members.map((member, index) => (
                  <MemberCard
                    key={index}
                    id={index}
                    name={member.name}
                    role={member.role}
                    isLeader={member.isLeader}
                    onClick={DisplayMemberDetails}
                    onDelete={deleteMember}
                  />
                ))}
              </div>
              {showSearch ? <MemberSearch /> : <AddMemberButton />}
            </div>
            
            <div className="member-details-scrollable">
              {memberId !== undefined && members[memberId] ? (
                <MemberDetails
                  id={memberId}
                  name={members[memberId].name}
                  role={members[memberId].role}
                  isLeader={members[memberId].isLeader}
                />
              ) : (
                <div className="no-member-selected">
                  <i className="fas fa-user"></i>
                  <p>Select a member to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TasksPage;