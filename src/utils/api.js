const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v1';

export const api = {
  baseUrl: API_BASE_URL,
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    me: `${API_BASE_URL}/auth/me`,
    logout: `${API_BASE_URL}/auth/logout`,
    updateDetails: `${API_BASE_URL}/auth/updatedetails`,
    updatePassword: `${API_BASE_URL}/auth/updatepassword`,
  },
  projects: {
    getAll: `${API_BASE_URL}/projects`, // Get all projects
    create: `${API_BASE_URL}/projects`, // Create a project
    getById: (projectId) => `${API_BASE_URL}/projects/${projectId}`, // Get a project by ID
    getUserProjects: `${API_BASE_URL}/projects/my-projects`, // Get user-specific projects
    update: (projectId) => `${API_BASE_URL}/projects/${projectId}`, // Update a project by ID
    delete: (projectId) => `${API_BASE_URL}/projects/${projectId}`, // Delete a project by ID
    addMember: (projectId) => `${API_BASE_URL}/projects/${projectId}/members`, // Add a member to a project
  },
  tasks: {
    getAll: `${API_BASE_URL}/tasks`, // Get all tasks
    getUserTasks: `${API_BASE_URL}/tasks/recent`, // Get recent tasks for the user
    getByProject: (projectId) => `${API_BASE_URL}/projects/${projectId}/tasks`, // Get tasks by project ID
    create: (projectId) => `${API_BASE_URL}/projects/${projectId}/tasks`, // Create a task in a project
    delete: (projectId, taskId) => `${API_BASE_URL}/projects/${projectId}/tasks/${taskId}`, // Delete a task by ID
    update: (taskId) => `${API_BASE_URL}/tasks/${taskId}`, // Update a task by ID
    addComment: (taskId) => `${API_BASE_URL}/tasks/${taskId}/comments`, // Add a comment to a task
    uploadAttachment: (taskId) => `${API_BASE_URL}/tasks/${taskId}/attachments`, // Upload an attachment to a task
    getOverdue: `${API_BASE_URL}/tasks/overdue`, // Get overdue tasks
  },
  chats: {
    getAll: `${API_BASE_URL}/chats`, // Get all chats
    getUserChats: `${API_BASE_URL}/chats/recent`, // Get recent chats for the user
    create: `${API_BASE_URL}/chats`, // Create a chat
    getById: (chatId) => `${API_BASE_URL}/chats/${chatId}`, // Get a chat by ID
  },
  users: {
    getAll: `${API_BASE_URL}/users`, // Get all users
    search: (searchTerm, projectId) => `${API_BASE_URL}/users?search=${searchTerm}&excludeProject=${projectId}`, // Search users excluding project members
  },
};

export default api;