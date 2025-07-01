import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import { changeDocumentTitle } from "../../utils/changeDocumentTitle";

import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { state } = useLocation();

  const {
    login,
    isLogin,
    loginState: { isLoading },
  } = useAuth();

  const onSubmit = async (data) => {
    if (isLoading) return;

    login({ email: data.email, password: data.password });
  };

  if (isLogin) return <Navigate to={state?.from || "/"} />;

  changeDocumentTitle("Login");

  return (
    <div className={`container ${styles["login-page"]}`}>
      <div className={styles["login-form-container"]}>
        <form
          action='POST'
          onSubmit={handleSubmit(onSubmit)}
          className={styles["login-form"]}>
          <div className={styles["login-row"]}>
            <h1 className={styles["login-title"]}>Login</h1>
            <label className={styles["login-label"]} htmlFor='email'>
              Enter your email
            </label>
            <input
              {...register("email")}
              placeholder='Email'
              id='email'
              name='email'
              type='email'
              className={`${styles["login-field"]} ${styles["login-input"]}`}
            />
          </div>
          <div className={styles["login-row"]}>
            <label className={styles["login-label"]} htmlFor='password'>
              Enter your password
            </label>
            <input
              {...register("password")}
              id='password'
              name='password'
              placeholder='Password'
              type='password'
              className={`${styles["login-field"]} ${styles["login-input"]}`}
            />
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className={`${styles["login-field"]} ${styles["login-button"]}`}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
