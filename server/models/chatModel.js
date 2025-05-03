const mongoose = require('mongoose');

// Message Sub-Schema
const messageSchema = new mongoose.Schema({
  sender: { 
    type: String, 
    required: true 
  },
  text: { 
    type: String, 
    required: true 
  },
  time: { 
    type: String, 
    required: true,
    default: () => new Date().toISOString()
  },
  fromMe: { 
    type: Boolean, 
    default: false 
  },
  readBy: [{ 
    type: String // Array of user emails who read the message
  }]
}, { 
  _id: true, // Give each message its own ID
  timestamps: true 
});

// Main Chat Schema
const chatSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  participants: [{ 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  }],
  project: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project',
    index: true
  },
  projectMembers: [{ 
    type: String,
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  }],
  unread: { 
    type: Number, 
    default: 0,
    min: 0
  },
  messages: [messageSchema],
  lastMessage: {
    text: String,
    time: {
      type: String,
      default: () => new Date().toISOString()
    },
    sender: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, // Auto-manage createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Update timestamp when messages are modified
chatSchema.pre('save', function(next) {
  if (this.isModified('messages')) {
    this.updatedAt = new Date();
    
    // Update lastMessage if messages array changed
    if (this.messages.length > 0) {
      const lastMsg = this.messages[this.messages.length - 1];
      this.lastMessage = {
        text: lastMsg.text,
        time: lastMsg.time,
        sender: lastMsg.sender
      };
    }
  }
  next();
});

// Add text index for search functionality
chatSchema.index({
  name: 'text',
  'messages.text': 'text'
});

// Virtual for unread count
chatSchema.virtual('unreadCount').get(function() {
  return this.messages.reduce((count, msg) => {
    return count + (msg.readBy && !msg.readBy.includes(this.participants[0]) ? 1 : 0);
  }, 0);
});

// Static method to find chats by participant
chatSchema.statics.findByParticipant = function(email) {
  return this.find({ 
    $or: [
      { participants: email },
      { projectMembers: email }
    ] 
  });
};

// Instance method to add message
chatSchema.methods.addMessage = async function(message) {
  this.messages.push(message);
  this.unread = this.unreadCount; // Update unread count
  return this.save();
};

// Instance method to mark as read
chatSchema.methods.markAsRead = async function(userEmail) {
  this.messages.forEach(msg => {
    if (!msg.readBy.includes(userEmail)) {
      msg.readBy.push(userEmail);
    }
  });
  this.unread = 0;
  return this.save();
};

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;