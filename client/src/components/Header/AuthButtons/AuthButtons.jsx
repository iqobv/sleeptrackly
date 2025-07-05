import { Link, useLocation } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";

import { FaUserPlus } from "react-icons/fa6";
import { MdLogin, MdLogout } from "react-icons/md";

import Loader from "../../Loader/Loader";

import styles from "./AuthButtons.module.scss";

const AuthButtons = ({ closeMenu = () => {}, isFull = false }) => {
  const { isLogin, logout, loading } = useAuth();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <div
      className={`${styles["auth-buttons"]} ${isFull ? styles["full"] : ""}`}
    >
      {loading && <Loader size="small" />}
      {!loading && (
        <>
          {isLogin && (
            <button
              onClick={handleLogout}
              className={`${styles["auth-button"]} ${styles["logout"]}`}
            >
              <MdLogout size={20} className={styles["auth-icon"]} />{" "}
              <span className={styles["auth-text"]}>Logout</span>
            </button>
          )}
          {!isLogin && (
            <>
              <Link
                className={`${styles["auth-button"]} ${styles["login"]}`}
                to="/login"
                state={{ from: pathname }}
                onClick={closeMenu}
              >
                <MdLogin size={20} className={styles["auth-icon"]} />
                <span className={styles["auth-text"]}>Login</span>
              </Link>
              <Link
                className={`${styles["auth-button"]} ${styles["register"]}`}
                to="/login"
                state={{ from: pathname }}
                onClick={closeMenu}
              >
                <FaUserPlus size={20} className={styles["auth-icon"]} />
                <span className={styles["auth-text"]}>Register</span>
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AuthButtons;
