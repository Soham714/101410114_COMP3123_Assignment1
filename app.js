require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp/employees', employeeRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Home page route (this handles GET requests to "/")
app.get('/', (req, res)=>{
    res.send('<h1>Welcome to My Website</h1><p>This is the home page for Vercel!</p>');
});