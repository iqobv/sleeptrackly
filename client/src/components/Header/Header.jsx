import React from "react";

import styles from "./Header.module.scss";
import Nav from "./Nav/Nav";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles["header-container"]}`}>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
