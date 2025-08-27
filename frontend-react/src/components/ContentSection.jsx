import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

const ContentSection = ({ section }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (section) {
      fetchContent();
    }
  }, [section]);

  const fetchContent = async () => {
    setLoading(true);
    setContent('');
    
    try {
      let url = '';
      switch (section) {
        case 'public':
          url = 'https://auth-bl96.onrender.com/api/users/public';
          break;
        case 'protected':
          url = 'https://auth-bl96.onrender.com/api/users/protected';
          break;
        case 'admin':
          url = 'https://auth-bl96.onrender.com/api/users/admin';
          break;
        case 'manager':
          url = 'https://auth-bl96.onrender.com/api/users/manager';
          break;
        default:
          setLoading(false);
          return;
      }

      // Add authorization header for protected routes
      const headers = {};
      const token = localStorage.getItem('token');
      if (token && section !== 'public') {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, { headers });
      const data = await response.json();

      if (response.ok) {
        if (section === 'public') {
          setContent(`<p>${data.message}</p>`);
        } else if (section === 'protected') {
          setContent(`
            <p>${data.message}</p>
            <p><strong>User:</strong> ${data.user.username}</p>
            <p><strong>Role:</strong> ${data.user.role}</p>
          `);
        } else if (section === 'admin') {
          setContent(`
            <p>${data.message}</p>
            <p><strong>User:</strong> ${data.user.username}</p>
            <p><strong>Role:</strong> ${data.user.role}</p>
          `);
        } else if (section === 'manager') {
          setContent(`
            <p>${data.message}</p>
            <p><strong>User:</strong> ${data.user.username}</p>
            <p><strong>Role:</strong> ${data.user.role}</p>
          `);
        }
      } else {
        setContent(`<p>${data.message}</p>`);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      setContent('<p>Error loading content</p>');
    }
    
    setLoading(false);
  };

  if (!section) {
    return (
      <div className="content-section">
        <h2>Welcome to the Authentication System</h2>
        <p>Please select a section from the navigation menu.</p>
      </div>
    );
  }

  if (section === 'home') {
    return (
      <div className="content-section">
        <ProtectedRoute>
          <h2>Dashboard</h2>
          {user && (
            <div>
              <p>Welcome, {user.username}!</p>
              <p>Your role is: <span className={`role-badge role-${user.role}`}>{user.role.toUpperCase()}</span></p>
            </div>
          )}
        </ProtectedRoute>
      </div>
    );
  }

  // For other sections, check permissions
  let allowedRoles = null;
  if (section === 'admin') {
    allowedRoles = ['admin'];
  } else if (section === 'manager') {
    allowedRoles = ['admin', 'manager'];
  }

  return (
    <div className="content-section">
      <h2>{section.charAt(0).toUpperCase() + section.slice(1)} Content</h2>
      <ProtectedRoute allowedRoles={allowedRoles}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </ProtectedRoute>
    </div>
  );
};

export default ContentSection;