const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Project CRUD
router.get('/', projectController.getAllProjects);
router.post('/', projectController.createProject);
router.get('/:id', projectController.getProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

// Task operations
router.post('/:projectId/tasks', projectController.addTask);

// Member operations
router.post('/:projectId/members', projectController.addMember);

module.exports = router;