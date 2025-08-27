const User = require('../models/User');

// User registration
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create(username, email, password, role);
    
    // Generate token
    const token = user.generateToken();
    
    // Return user data and token
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: user.getUserData()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = User.findByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = user.generateToken();
    
    // Return user data and token
    res.json({
      message: 'Login successful',
      token,
      user: user.getUserData()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
const getCurrentUser = async (req, res) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: user.getUserData() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser
};