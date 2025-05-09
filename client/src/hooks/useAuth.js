import { useMutation, useQuery } from "@tanstack/react-query";
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  checkAuth as apiCheckAuth,
} from "../api/auth";

import { useDispatch, useSelector } from "react-redux";
import { setUser, logout as logoutAction } from "../reducers/slices/userSlice";
import { useEffect, useState } from "react";

const useAuth = () => {
  const { user, userId, isLogin } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { mutate: login } = useMutation({
    mutationFn: ({ email, password }) => apiLogin(email, password),
    mutationKey: ["login"],
    onSuccess: (data) => {
      dispatch(setUser(data?.user));
    },
  });

  const { mutate: logout } = useMutation({
    mutationFn: async () => await apiLogout(),
    mutationKey: ["logout"],
    onSuccess: () => {
      dispatch(logoutAction());
    },
  });

  const { mutate: register } = useMutation({
    mutationFn: ({ username, email, password }) =>
      apiRegister(username, email, password),
    mutationKey: ["register"],
    onSuccess: (data) => {
      dispatch(setUser(data?.user));
    },
  });

  const {
    refetch: checkAuth,
    data: authData,
    isLoading: isLoadingAuth,
    isError: isErrorAuth,
  } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: () => apiCheckAuth(),
    enabled: false,
  });

  useEffect(() => {
    if (!isLoadingAuth && isErrorAuth) dispatch(logoutAction());
    if (!isLoadingAuth && !isErrorAuth && authData) {
      dispatch(setUser(authData?.user));
      setLoading(false);
    }
  }, [authData, isLoadingAuth, isErrorAuth]);

  return {
    user,
    userId,
    isLogin,
    loadingAuth: isLoadingAuth,
    loading,
    login,
    logout,
    register,
    checkAuth,
  };
};

export default useAuth;
