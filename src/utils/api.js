// src/utils/api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v1';

export const api = {
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    me: `${API_BASE_URL}/auth/me`,
    logout: `${API_BASE_URL}/auth/logout`,
    updateDetails: `${API_BASE_URL}/auth/updatedetails`,
    updatePassword: `${API_BASE_URL}/auth/updatepassword`
  },
  // Add other API endpoints as needed
};

export default api;