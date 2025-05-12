import { Link, useLocation } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";

import Loader from "../../Loader/Loader";

import styles from "./AuthButtons.module.scss";

const AuthButtons = ({ closeMenu = () => {} }) => {
  const { isLogin, logout, loading } = useAuth();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <div className={styles["auth-buttons"]}>
      {loading && <Loader size='small' />}
      {!loading && (
        <>
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
                state={{ from: pathname }}
                onClick={closeMenu}>
                Register
              </Link>
              <Link
                className={`${styles["auth-button"]} ${styles["login"]}`}
                to='/login'
                state={{ from: pathname }}
                onClick={closeMenu}>
                Login
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AuthButtons;
