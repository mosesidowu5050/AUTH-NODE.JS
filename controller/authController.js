const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', 
    });
};

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        const newUser = new User({ username, password });
        await newUser.save();

        console.log('Registered new user:', username); 
        return res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Server error during registration.' });
    }
};


exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const token = generateToken(user._id);
        console.log('User logged in:', username); 
        return res.status(200).json({ token: token, username: user.username });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error during login.' });
    }
};


exports.getProfile = (req, res) => {

    res.status(200).json({
        message: 'Welcome to your profile!',
        user: {
            id: req.user.id,
            username: req.user.username 
        }
    });
};
