const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// User Signup
exports.signupUser = async (req, res) => {
    const { username, email, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created successfully.', user_id: savedUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid Username and password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Username and password' });
        }

        // Optionally return JWT or session here
        res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
};
