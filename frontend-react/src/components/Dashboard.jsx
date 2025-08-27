import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="dashboard">
      <div className="user-info">
        <h2>Welcome, {user.username}!</h2>
        <p>
          Role: <span className={`role-badge role-${user.role}`}>{user.role.toUpperCase()}</span>
        </p>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;