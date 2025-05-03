const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Member', 'Admin', 'Owner'],
    default: 'Member'
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a project name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['Planning', 'Active', 'On Hold', 'Completed', 'Archived'],
    default: 'Planning'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [memberSchema],
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  startDate: Date,
  endDate: Date,
  tags: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add member to project
projectSchema.methods.addMember = function(userId, role = 'Member') {
  if (!this.members.some(m => m.user.toString() === userId.toString())) {
    this.members.push({ user: userId, role });
    return this.save();
  }
  return Promise.resolve(this);
};

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;