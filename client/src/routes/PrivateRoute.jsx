import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, path = "/login" }) => {
  const { isLogin, checkAuth, loading } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return null;

  return isLogin ? children : <Navigate to={path} />;
};
