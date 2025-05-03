const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: String },
  status: { 
    type: String, 
    enum: ['Not Started', 'In Progress', 'Completed', 'Pending'], 
    default: 'Not Started' 
  },
  deadline: { type: Date },
  attachment: { type: String }
}, { timestamps: true });

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  isLeader: { type: Boolean, default: false },
  email: { type: String }
});

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Completed'], 
    default: 'Pending' 
  },
  description: { type: String },
  tasks: [TaskSchema],
  members: [MemberSchema]
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);