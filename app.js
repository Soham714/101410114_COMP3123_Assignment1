require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    // Handle MongoDB connection error
  });

// Use routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp/employees', employeeRoutes);

// Home page route (this handles GET requests to "/")
app.get('/', (req, res) => {
  res.send('<h1>Welcome to My Website</h1><p>This is the home page for Vercel!</p>');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
