import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();

  const { login, isLogin } = useAuth();

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
        <input
          {...register("email")}
          placeholder='Email'
          name='email'
          type='email'
        />
        <input
          {...register("password")}
          name='password'
          placeholder='Password'
          type='password'
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
