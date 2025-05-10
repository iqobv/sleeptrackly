import { NavLink, useLocation } from "react-router-dom";

import { links } from "./links";

import styles from "./NavLinks.module.scss";

const NavLinks = ({ closeMenu = () => {} }) => {
  const { pathname } = useLocation();

  return (
    <ul className={styles["nav-list"]}>
      {links.map(({ name, label, path }) => (
        <li key={name} className={styles["nav-item"]}>
          <NavLink
            className={`${styles["nav-link"]} ${
              pathname === path ? styles.active : ""
            }`}
            to={path}
            onClick={closeMenu}>
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
