import Nav from "./Nav/Nav";

import styles from "./Header.module.scss";

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
