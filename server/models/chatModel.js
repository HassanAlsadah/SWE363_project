const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  text: { type: String, required: true },
  time: { type: String, required: true },
  fromMe: { type: Boolean, default: false }
}, { _id: false });

const chatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unread: { type: Number, default: 0 },
  project: { type: String },
  messages: [messageSchema],
  lastMessage: {
    text: String,
    time: String,
    sender: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);