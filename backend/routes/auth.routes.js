const express = require('express');
const { register, login, getCurrentUser } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get current user (protected route)
router.get('/user', authMiddleware, getCurrentUser);

module.exports = router;