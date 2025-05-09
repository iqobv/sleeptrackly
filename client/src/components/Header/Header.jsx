import React from "react";

import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks/NavLinks";

const Header = () => {
  return (
    <header>
      <div className={`container ${styles.header}`}>
        {/* <Link to='/'>Home</Link> */}
        <NavLinks />
      </div>
    </header>
  );
};

export default Header;
