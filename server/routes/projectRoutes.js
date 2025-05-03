const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getMyProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  addMember
} = require('../controllers/projectController');

const router = express.Router();

router.get('/my-projects', protect, getMyProjects); // Fetch user-specific projects
router.get('/:id', protect, getProject);           // Fetch project by ID
router.post('/', protect, createProject);          // Create a new project
router.put('/:id', protect, updateProject);        // Update a project
router.delete('/:id', protect, deleteProject);     // Delete a project
router.post('/:projectId/members', protect, addMember); // Add a member to a project

module.exports = router;