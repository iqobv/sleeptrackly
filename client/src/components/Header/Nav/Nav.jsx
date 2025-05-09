import React, { useEffect, useState } from "react";

import styles from "./Nav.module.scss";
import NavLinks from "../NavLinks/NavLinks";
import MenuButton from "../MenuButton/MenuButton";
import AuthButtons from "../AuthButtons/AuthButtons";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForBtn, setIsOpenForBtn] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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
        <AuthButtons />
      </div>
      <div
        className={`${styles["nav-overlay"]} ${isOpen ? styles["open"] : ""} ${
          isClosing ? styles["closing"] : ""
        }`}
        tabIndex={isOpen ? 0 : -1}>
        <div className={styles["nav-overlay-content"]}>
          <nav className={styles.nav}>
            <NavLinks closeMenu={handleClick} />
          </nav>
          <AuthButtons />
        </div>
      </div>
    </>
  );
};

export default Nav;
