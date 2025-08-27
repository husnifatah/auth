import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = ({ onShowLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const result = await register(username, email, password, role);
    
    if (result.success) {
      setSuccess('Registration successful!');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reg-username">Username:</label>
          <input
            type="text"
            id="reg-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-email">Email:</label>
          <input
            type="email"
            id="reg-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-password">Password:</label>
          <input
            type="password"
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-role">Role:</label>
          <select
            id="reg-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
              <option value="manager">Manager</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <button onClick={onShowLogin} className="link-button">
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;