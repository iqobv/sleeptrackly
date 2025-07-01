import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export const PrivateRoute = ({
  children,
  redirect = "/login",
  isAdminRoute = false,
  adminRedirect = "/",
}) => {
  const { isLogin, checkAuth, loading, isAdmin } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) return null;

  return isLogin ? (
    isAdminRoute && !isAdmin ? (
      <Navigate to={adminRedirect} state={{ from: pathname }} replace />
    ) : (
      children
    )
  ) : (
    <Navigate to={redirect} state={{ from: pathname }} replace />
  );
};
