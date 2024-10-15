import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  role?: string; // Optional role restriction
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const userRole = localStorage.getItem("role");

  if (!userRole) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  if (role && userRole !== role) {
    return <Navigate to="/main" />; // Redirect to main page if role doesn't match
  }

  return <>{children}</>;
};

export default ProtectedRoute;
