import React from "react";

import { links } from "./links";

import styles from "./NavLinks.module.scss";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <ul className={styles["nav-list"]}>
      {links.map(({ name, label, path }) => (
        <li key={name} className={styles["nav-item"]}>
          <NavLink to={path}>{label}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
