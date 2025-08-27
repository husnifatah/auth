const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const router = express.Router();

// Public route - accessible by everyone
router.get('/public', (req, res) => {
  res.json({ message: 'This is a public route accessible by everyone' });
});

// Protected route - accessible by authenticated users
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ 
    message: 'This is a protected route accessible by authenticated users',
    user: req.user
  });
});

// Admin only route - accessible by admin users only
router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ 
    message: 'This is an admin-only route',
    user: req.user
  });
});

// Manager route - accessible by admin and manager roles
router.get('/manager', authMiddleware, roleMiddleware('admin', 'manager'), (req, res) => {
  res.json({ 
    message: 'This route is accessible by admin and manager roles',
    user: req.user
  });
});

module.exports = router;