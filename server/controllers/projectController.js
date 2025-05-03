const Project = require('../models/projectModel');
const Task = require('../models/taskModel');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Private
exports.getAllProjects = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Create new project
// @route   POST /api/v1/projects
// @access  Private
exports.createProject = asyncHandler(async (req, res, next) => {
  // Add logged in user as creator
  req.body.createdBy = req.user.id;

  // Create project
  const project = await Project.create(req.body);

  // Automatically add creator as admin member
  project.members.push({
    user: req.user.id,
    role: 'Admin'
  });

  await project.save();

  // Populate the project data before returning
  const populatedProject = await Project.findById(project._id)
    .populate('createdBy', 'name email')
    .populate('members.user', 'name email');

  res.status(201).json({
    success: true,
    data: populatedProject
  });
});

// @desc    Get single project
// @route   GET /api/v1/projects/:id
// @access  Private
exports.getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id)
    .populate('createdBy', 'name email')
    .populate('members.user', 'name email')
    .populate('tasks');

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if user is project member or creator
  const isMember = project.members.some(m => 
    m.user._id.toString() === req.user.id || 
    m.user.toString() === req.user.id
  );
  const isCreator = project.createdBy._id.toString() === req.user.id || 
                    project.createdBy.toString() === req.user.id;

  if (!isMember && !isCreator && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this project`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Update project
// @route   PUT /api/v1/projects/:id
// @access  Private
exports.updateProject = asyncHandler(async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is project creator or admin
  const isCreator = project.createdBy.toString() === req.user.id;
  if (!isCreator && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this project`,
        401
      )
    );
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .populate('createdBy', 'name email')
    .populate('members.user', 'name email');

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Delete project
// @route   DELETE /api/v1/projects/:id
// @access  Private
exports.deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is project creator or admin
  const isCreator = project.createdBy.toString() === req.user.id;
  if (!isCreator && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this project`,
        401
      )
    );
  }

  // Delete all tasks associated with this project
  await Task.deleteMany({ project: project._id });

  await project.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Add member to project
// @route   POST /api/v1/projects/:projectId/members
// @access  Private
exports.addMember = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.projectId);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.projectId}`, 404)
    );
  }

  // Make sure user is project admin or creator
  const isAdmin = project.members.some(m => 
    (m.user.toString() === req.user.id || m.user._id.toString() === req.user.id) && 
    m.role === 'Admin'
  );
  const isCreator = project.createdBy.toString() === req.user.id;

  if (!isAdmin && !isCreator && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add members to this project`,
        401
      )
    );
  }

  // Check if user is already a member
  const isMember = project.members.some(m => 
    m.user.toString() === req.body.user || 
    (m.user._id && m.user._id.toString() === req.body.user)
  );

  if (isMember) {
    return next(
      new ErrorResponse(`User ${req.body.user} is already a project member`, 400)
    );
  }

  // Add new member
  project.members.push({
    user: req.body.user,
    role: req.body.role || 'Member'
  });

  await project.save();

  // Populate the updated project data
  const populatedProject = await Project.findById(project._id)
    .populate('createdBy', 'name email')
    .populate('members.user', 'name email');

  res.status(200).json({
    success: true,
    data: populatedProject
  });
});

// @desc    Get projects for current user
// @route   GET /api/v1/projects/my-projects
// @access  Private
exports.getMyProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find({
    $or: [
      { 'members.user': req.user.id },
      { createdBy: req.user.id }
    ]
  })
  .populate('createdBy', 'name email')
  .populate('members.user', 'name email')
  .populate('tasks')
  .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});

// @desc    Add task to project
// @route   POST /api/v1/projects/:projectId/tasks
// @access  Private
exports.addTask = asyncHandler(async (req, res, next) => {
  req.body.project = req.params.projectId;
  req.body.createdBy = req.user.id;

  const project = await Project.findById(req.params.projectId);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.projectId}`, 404)
    );
  }

  // Make sure user is project member
  const isMember = project.members.some(m => 
    m.user.toString() === req.user.id || 
    (m.user._id && m.user._id.toString() === req.user.id)
  );
  const isCreator = project.createdBy.toString() === req.user.id;

  if (!isMember && !isCreator && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add tasks to this project`,
        401
      )
    );
  }

  const task = await Task.create(req.body);

  // Add task to project's tasks array
  project.tasks.push(task._id);
  await project.save();

  res.status(201).json({
    success: true,
    data: task
  });
});