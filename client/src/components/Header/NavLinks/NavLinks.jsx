import { NavLink, useLocation } from "react-router-dom";

import { links } from "./links";

import useAuth from "../../../hooks/useAuth";

import styles from "./NavLinks.module.scss";

const NavLinks = ({ closeMenu = () => {} }) => {
  const { pathname } = useLocation();
  const { isAdmin } = useAuth();

  return (
    <ul className={styles["nav-list"]}>
      {links.map((link) => {
        if (!isAdmin && link.isAdmin) return null;
        return (
          <li key={link.name} className={styles["nav-item"]}>
            <NavLink
              className={`${styles["nav-link"]} ${
                pathname === link.path ? styles.active : ""
              }`}
              to={link.path}
              onClick={closeMenu}>
              {link.label}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
