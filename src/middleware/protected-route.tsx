import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const cookie = Cookies.get(import.meta.env.VITE_AUTH_TOKEN_KEY); // Example: Check for a token

  if (!(cookie != "" && cookie != undefined)) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth" replace />;
  }

  // Render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
