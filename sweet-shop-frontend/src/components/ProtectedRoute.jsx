import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, roleRequired }) {
  const { token, role } = useContext(AuthContext);

  if (!token) return <Navigate to="/" />;

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
