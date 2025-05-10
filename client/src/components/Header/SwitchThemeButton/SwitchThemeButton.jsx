import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "../../../reducers/slices/themeSlice";

import styles from "./SwitchThemeButton.module.scss";

const SwitchThemeButton = () => {
  const { theme } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const switchTheme = () => dispatch(toggleTheme());

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return <button onClick={switchTheme}>Switch</button>;
};

export default SwitchThemeButton;
