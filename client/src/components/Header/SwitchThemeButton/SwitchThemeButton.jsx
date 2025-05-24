import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IoMdSunny, IoMdMoon } from "react-icons/io";

import { toggleTheme } from "../../../reducers/slices/themeSlice";

import Button from "../../Button/Button";

import styles from "./SwitchThemeButton.module.scss";

const SwitchThemeButton = () => {
  const { theme } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const switchTheme = () => dispatch(toggleTheme());

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Button
      content={theme === "light" ? <IoMdMoon /> : <IoMdSunny />}
      onClick={switchTheme}
      title='Switch theme'
      aria-label='Switch theme'
      className={styles["switch-theme-button"]}
      isIcon
    />
  );
};

export default SwitchThemeButton;
