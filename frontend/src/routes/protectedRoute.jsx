// frontend/src/routes/protectedRoute.jsx
import { Navigate } from "react-router-dom";
import { AuthProvider } from "../context/auth.jsx";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = AuthProvider.useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/coming-soon" replace />;
  return children;
}
