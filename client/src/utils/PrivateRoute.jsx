import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import EmployeeDashboard from '../pages/EmployeeDashboard';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Conditional rendering based on the user's role
  if (user.role === 'admin') {
    return <AdminDashboard />;
  } else if (user.role === 'employee') {
    return <EmployeeDashboard />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
