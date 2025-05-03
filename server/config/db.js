//db
require('colors');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    console.log(`Database Name: ${conn.connection.name}`);
    console.log(`Connection state: ${mongoose.connection.readyState}`);
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message}`.red.bold);
    process.exit(1);
  }
};

// Connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

module.exports = connectDB;