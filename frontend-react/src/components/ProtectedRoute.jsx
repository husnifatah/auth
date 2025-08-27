import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <div>You need to be logged in to view this content.</div>;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div>You don't have permission to view this content.</div>;
  }

  return children;
};

export default ProtectedRoute;