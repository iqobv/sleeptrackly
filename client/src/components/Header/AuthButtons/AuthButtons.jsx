import { Link } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";

import styles from "./AuthButtons.module.scss";

const AuthButtons = ({ closeMenu = () => {} }) => {
  const { isLogin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <div className={styles["auth-buttons"]}>
      {isLogin && (
        <button
          onClick={handleLogout}
          className={`${styles["auth-button"]} ${styles["logout"]}`}>
          Logout
        </button>
      )}
      {!isLogin && (
        <>
          <Link
            className={`${styles["auth-button"]} ${styles["register"]}`}
            to='/login'
            onClick={closeMenu}>
            Register
          </Link>
          <Link
            className={`${styles["auth-button"]} ${styles["login"]}`}
            to='/login'
            onClick={closeMenu}>
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
