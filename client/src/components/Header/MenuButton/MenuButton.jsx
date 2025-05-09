import styles from "./MenuButton.module.scss";

const MenuButton = ({ onClick, isOpen, isClosing }) => {
  return (
    <button
      className={`${styles["menu-button"]} ${isOpen ? styles.open : ""} ${
        isClosing ? styles.closing : ""
      }`}
      onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default MenuButton;
