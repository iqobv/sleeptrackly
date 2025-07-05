import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import AuthButtons from "../AuthButtons/AuthButtons";
import MenuButton from "../MenuButton/MenuButton";
import NavLinks from "../NavLinks/NavLinks";
import SwitchThemeButton from "../SwitchThemeButton/SwitchThemeButton";

import styles from "./Nav.module.scss";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForBtn, setIsOpenForBtn] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const show = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const handleOpen = () => {
    setIsOpen(true);
    setIsClosing(false);
    setIsOpenForBtn(true);
  };

  const handleClick = () => {
    isOpen ? (setIsClosing(true), setIsOpenForBtn(false)) : handleOpen();
  };

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isClosing]);

  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [isOpen]);

  const handleCloseOnOverlay = (e) => {
    e.target === e.currentTarget && handleClick();
  };

  useEffect(() => {
    if (!show) {
      setIsOpen(false);
      setIsClosing(false);
      setIsOpenForBtn(false);
    }
  }, [show]);

  return (
    <>
      <MenuButton
        onClick={handleClick}
        isOpen={isOpenForBtn}
        isClosing={isClosing}
      />
      <div className={styles["nav-container"]}>
        <nav className={styles.nav}>
          <NavLinks />
        </nav>
        <div className={styles["theme-auth-container"]}>
          <SwitchThemeButton />
          <div className={styles["auth-container"]}>
            <AuthButtons />
          </div>
        </div>
      </div>
      {show && (
        <div
          className={`${styles["nav-overlay"]} ${
            isOpen ? styles["open"] : ""
          } ${isClosing ? styles["closing"] : ""}`}
          onClick={handleCloseOnOverlay}
          tabIndex={isOpen ? 0 : -1}
        >
          <div className={styles["nav-overlay-content"]}>
            <nav className={styles.nav}>
              <NavLinks closeMenu={handleClick} />
            </nav>
            <AuthButtons closeMenu={handleClick} isFull />
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
