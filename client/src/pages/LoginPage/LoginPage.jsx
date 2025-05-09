import { useForm } from "react-hook-form";

import styles from "./LoginPage.module.scss";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserId } from "../../reducers/slices/userSlice";
import useAuth from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { pathname } = useLocation();

  const { isLogin } = useSelector((state) => state.user);

  const { login } = useAuth();

  const onSubmit = async (data) => {
    login({ email: data.email, password: data.password });
  };

  if (isLogin) return <Navigate to={"/"} />;

  return (
    <div className={`container ${styles["login-page"]}`}>
      <form
        action='POST'
        onSubmit={handleSubmit(onSubmit)}
        className={styles["login-form"]}>
        <input {...register("email")} placeholder='Email' />
        <input {...register("password")} placeholder='Password' />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
