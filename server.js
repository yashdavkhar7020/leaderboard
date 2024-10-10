const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const userRoutes = require('./routes/users');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*', // Adjust this for your frontend URL
    methods: ['GET', 'POST'], // Specify allowed methods
  },
});

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// MongoDB Connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Additional options
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      autoIndex: true, // Build indexes automatically
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure
  }
};

connectToDatabase();

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle socket events as needed
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  // Example event handling
  socket.on('userUpdate', (userData) => {
    // Broadcast the user update to all clients
    socket.broadcast.emit('update', userData);
  });
});

// Make io accessible to routes (optional, depending on your routing needs)
app.set('io', io);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
