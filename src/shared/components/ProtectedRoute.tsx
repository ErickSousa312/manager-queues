import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext/AuthProvider";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const storedRole = localStorage.getItem("role");
  const { isAuthenticated, user } = useAuth();

  console.log(storedRole);
  console.log(isAuthenticated);
  console.log(user);

  // if (!storedRole || !roles.includes(storedRole) || !isAuthenticated) {
  //   return <Navigate to="/" />;
  // }

  if (!isAuthenticated && !storedRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
