// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// For demonstration, we use a simple `isLoggedIn` flag.
// In the future, replace this with your actual authentication check.
const isLoggedIn = false;  // Change to true to access protected routes

const ProtectedRoute = ({ children }) => {
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
