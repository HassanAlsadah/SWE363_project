const mongoose = require('mongoose');
const { Schema } = mongoose;

// Sub-schema for task comments
const commentSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  text: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 500 
  },
  attachments: [{
    url: String,
    filename: String,
    size: Number,
    mimetype: String
  }]
}, { 
  timestamps: true 
});

// Sub-schema for task history/audit log
const historySchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  action: { 
    type: String, 
    required: true,
    enum: ['create', 'update', 'status', 'assign', 'dueDate', 'comment', 'attachment']
  },
  field: String,
  oldValue: mongoose.Schema.Types.Mixed,
  newValue: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
});

// Main Task Schema
const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Task name is required'],
    trim: true,
    maxlength: [100, 'Task name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Task must belong to a project'],
    index: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Not Started', 'In Progress', 'Completed', 'On Hold', 'Cancelled'],
    default: 'Not Started'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function(v) {
        return !v || v > new Date();
      },
      message: 'Due date must be in the future'
    }
  },
  assignedTo: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completedAt: Date,
  estimatedHours: {
    type: Number,
    min: [0, 'Estimated hours cannot be negative']
  },
  actualHours: {
    type: Number,
    min: [0, 'Actual hours cannot be negative'],
    default: 0
  },
  attachments: [{
    url: String,
    filename: String,
    size: Number,
    mimetype: String,
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  comments: [commentSchema],
  history: [historySchema],
  tags: [{
    type: String,
    trim: true,
    maxlength: [20, 'Tags cannot exceed 20 characters']
  }],
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
taskSchema.index({ project: 1, status: 1 });
taskSchema.index({ assignedTo: 1, status: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ name: 'text', description: 'text' });

// Virtual for overdue status
taskSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate) return false;
  return this.status !== 'Completed' && this.dueDate < new Date();
});

// Pre-save hook to update completedAt
taskSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'Completed') {
    this.completedAt = new Date();
  }
  next();
});

// Static method to get tasks by status
taskSchema.statics.findByStatus = function(status) {
  return this.find({ status });
};

// Static method to get overdue tasks
taskSchema.statics.findOverdue = function() {
  return this.find({ 
    dueDate: { $lt: new Date() },
    status: { $ne: 'Completed' }
  });
};

// Instance method to add comment
taskSchema.methods.addComment = function(userId, text) {
  this.comments.push({ user: userId, text });
  this.history.push({
    user: userId,
    action: 'comment',
    newValue: text
  });
  return this.save();
};

// Instance method to update status
taskSchema.methods.updateStatus = function(userId, newStatus) {
  const oldStatus = this.status;
  this.status = newStatus;
  this.history.push({
    user: userId,
    action: 'status',
    field: 'status',
    oldValue: oldStatus,
    newValue: newStatus
  });
  return this.save();
};

// Query helper to exclude deleted tasks
taskSchema.query.excludeDeleted = function() {
  return this.where({ isDeleted: false });
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;