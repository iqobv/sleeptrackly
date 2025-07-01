import { useDispatch, useSelector } from "react-redux";

import { IoMdMoon, IoMdSunny } from "react-icons/io";

import { toggleTheme } from "../../../reducers/slices/themeSlice";

import Button from "../../Button/Button";

import styles from "./SwitchThemeButton.module.scss";

const SwitchThemeButton = () => {
  const { theme } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const switchTheme = () => dispatch(toggleTheme());

  return (
    <Button
      onClick={switchTheme}
      title="Switch theme"
      aria-label="Switch theme"
      className={styles["switch-theme-button"]}
      isIcon
    >
      {theme === "light" ? <IoMdMoon /> : <IoMdSunny />}
    </Button>
  );
};

export default SwitchThemeButton;
