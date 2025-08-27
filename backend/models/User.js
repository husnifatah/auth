const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt.config');

// In-memory user storage (in production, use a database)
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    // Password is 'admin123' hashed
    password: '$2a$10$Q7GVgLrDlXTbuk3hF0e6temA4eAcE1MLM0Z9UVDCvqzPjSUKIav8.',
    role: 'admin'
  },
  {
    id: 2,
    username: 'user',
    email: 'user@example.com',
    // Password is 'user123' hashed
    password: '$2a$10$Q7GVgLrDlXTbuk3hF0e6tee2zige3kUFr4R70a7vZYHBtWBtKmxd2',
    role: 'user'
  }
];

class User {
  constructor(id, username, email, password, role) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  // Find user by username
  static findByUsername(username) {
    const user = users.find(u => u.username === username);
    return user ? new User(user.id, user.username, user.email, user.password, user.role) : null;
  }

  // Find user by ID
  static findById(id) {
    const user = users.find(u => u.id === id);
    return user ? new User(user.id, user.username, user.email, user.password, user.role) : null;
  }

  // Create a new user
  static async create(username, email, password, role = 'user') {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user object
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      role
    };
    
    users.push(newUser);
    return new User(newUser.id, newUser.username, newUser.email, newUser.password, newUser.role);
  }

  // Compare password
  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  // Generate JWT token
  generateToken() {
    return jwt.sign(
      { id: this.id, username: this.username, role: this.role },
      secret,
      { expiresIn }
    );
  }

  // Get user data without password
  getUserData() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      role: this.role
    };
  }
}

module.exports = User;