const Task = require('../models/taskModel');
const Project = require('../models/projectModel');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @route   GET /api/v1/projects/:projectId/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res, next) => {
  if (req.params.projectId) {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Private
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id)
    .populate('project', 'name description status')
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email')
    .populate('comments.user', 'name email');

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task owner or project member
  if (
    task.createdBy.toString() !== req.user.id &&
    !task.assignedTo.some(user => user._id.toString() === req.user.id)
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this task`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: task
  });
});

// @desc    Get recent tasks for current user
// @route   GET /api/v1/tasks/recent
// @access  Private
exports.getRecentTasks = asyncHandler(async (req, res, next) => {
    const tasks = await Task.find({
      $or: [
        { assignedTo: req.user.id },
        { createdBy: req.user.id }
      ],
      status: { $ne: 'Completed' }
    })
    .populate('project', 'name status')
    .populate('assignedTo', 'name email')
    .sort('-createdAt')
    .limit(6);
  
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  });



// @desc    Create task
// @route   POST /api/v1/projects/:projectId/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res, next) => {
  req.body.project = req.params.projectId;
  req.body.createdBy = req.user.id;

  const project = await Project.findById(req.params.projectId);

  if (!project) {
    return next(
      new ErrorResponse(`No project with the id of ${req.params.projectId}`, 404)
    );
  }

  // Make sure user is project member
  if (
    !project.members.some(member => member.email === req.user.email) &&
    req.user.role !== 'admin'
  ) {
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

  // Add to history log
  task.history.push({
    user: req.user.id,
    action: 'create',
    field: 'task',
    newValue: task.name
  });
  await task.save();

  res.status(201).json({
    success: true,
    data: task
  });
});

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task creator, assigned to task, or admin
  if (
    task.createdBy.toString() !== req.user.id &&
    !task.assignedTo.some(user => user.toString() === req.user.id) &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this task`,
        401
      )
    );
  }

  // Handle status change specifically
  if (req.body.status && req.body.status !== task.status) {
    task.history.push({
      user: req.user.id,
      action: 'status',
      field: 'status',
      oldValue: task.status,
      newValue: req.body.status
    });

    if (req.body.status === 'Completed') {
      req.body.completedAt = Date.now();
    }
  }

  // Handle assignment change
  if (req.body.assignedTo && req.body.assignedTo.toString() !== task.assignedTo.toString()) {
    task.history.push({
      user: req.user.id,
      action: 'assign',
      field: 'assignedTo',
      oldValue: task.assignedTo,
      newValue: req.body.assignedTo
    });
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: task
  });
});

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task creator or admin
  if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this task`,
        401
      )
    );
  }

  // Remove task from project's tasks array
  await Project.findByIdAndUpdate(task.project, {
    $pull: { tasks: task._id }
  });

  await task.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Add comment to task
// @route   POST /api/v1/tasks/:id/comments
// @access  Private
exports.addComment = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task creator, assigned to task, or admin
  if (
    task.createdBy.toString() !== req.user.id &&
    !task.assignedTo.some(user => user.toString() === req.user.id) &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to comment on this task`,
        401
      )
    );
  }

  const comment = {
    user: req.user.id,
    text: req.body.text,
    attachments: req.body.attachments || []
  };

  task.comments.push(comment);
  task.history.push({
    user: req.user.id,
    action: 'comment',
    field: 'comments',
    newValue: req.body.text.substring(0, 50) + '...'
  });

  await task.save();

  res.status(200).json({
    success: true,
    data: task.comments
  });
});

// @desc    Get recent tasks for current user
// @route   GET /api/v1/tasks/recent
// @access  Private
exports.getRecentTasks = asyncHandler(async (req, res, next) => {
  // Find tasks where user is assigned or creator
  const tasks = await Task.find({
    $or: [
      { assignedTo: req.user.id },
      { createdBy: req.user.id }
    ],
    status: { $ne: 'Completed' }
  })
    .sort('-createdAt')
    .limit(6)
    .populate('project', 'name')
    .populate('assignedTo', 'name');

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// @desc    Get overdue tasks
// @route   GET /api/v1/tasks/overdue
// @access  Private
exports.getOverdueTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find({
    dueDate: { $lt: new Date() },
    status: { $ne: 'Completed' },
    $or: [
      { assignedTo: req.user.id },
      { createdBy: req.user.id }
    ]
  })
    .populate('project', 'name')
    .populate('assignedTo', 'name');

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// @desc    Upload task attachment
// @route   PUT /api/v1/tasks/:id/attachments
// @access  Private
exports.uploadAttachment = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task creator, assigned to task, or admin
  if (
    task.createdBy.toString() !== req.user.id &&
    !task.assignedTo.some(user => user.toString() === req.user.id) &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this task`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Check file type
  if (!file.mimetype.startsWith('image') && !file.mimetype.startsWith('application')) {
    return next(new ErrorResponse(`Please upload an image or document file`, 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD / 1000000}MB`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `attachment_${task._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    const attachment = {
      url: `${req.protocol}://${req.get('host')}/uploads/${file.name}`,
      filename: file.name,
      size: file.size,
      mimetype: file.mimetype,
      uploadedBy: req.user.id
    };

    task.attachments.push(attachment);
    task.history.push({
      user: req.user.id,
      action: 'attachment',
      field: 'attachments',
      newValue: file.name
    });

    await task.save();

    res.status(200).json({
      success: true,
      data: attachment
    });
  });
});