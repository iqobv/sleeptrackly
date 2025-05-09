import React from "react";
import { NavLink } from "react-router-dom";

import { links } from "./links";

import styles from "./NavLinks.module.scss";

const NavLinks = ({ closeMenu = () => {} }) => {
  return (
    <ul className={styles["nav-list"]}>
      {links.map(({ name, label, path }) => (
        <li key={name} className={styles["nav-item"]}>
          <NavLink to={path} onClick={closeMenu}>
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
