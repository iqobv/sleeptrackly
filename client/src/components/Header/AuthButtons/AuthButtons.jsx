import { Link } from "react-router-dom";

import styles from "./AuthButtons.module.scss";

import useAuth from "../../../hooks/useAuth";

const AuthButtons = () => {
  const { isLogin, logout } = useAuth();

  return (
    <div className={styles["auth-buttons"]}>
      {isLogin && (
        <button
          onClick={logout}
          className={`${styles["auth-button"]} ${styles["logout"]}`}>
          Logout
        </button>
      )}
      {!isLogin && (
        <>
          <Link
            className={`${styles["auth-button"]} ${styles["register"]}`}
            to='/login'>
            Register
          </Link>
          <Link
            className={`${styles["auth-button"]} ${styles["login"]}`}
            to='/login'>
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
