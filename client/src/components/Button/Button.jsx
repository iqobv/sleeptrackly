import { Link } from "react-router-dom";

import styles from "./Button.module.scss";

const Button = ({
  content,
  onClick,
  className = "",
  isLink = false,
  variant = "filled",
  color = "primary",
  disabled = false,
  redirect,
  isIcon = false,
  type = "button",
  ...props
}) => {
  const btnVariant = isIcon ? "text" : variant;

  const classList = `${styles["button"]}  ${styles[btnVariant]} ${
    styles[color]
  } ${disabled ? styles["disabled"] : ""} ${
    isIcon ? styles["icon-btn"] : ""
  } ${className}`;

  return (
    <>
      {!isLink && (
        <button
          disabled={disabled}
          onClick={onClick}
          className={classList}
          type={type}
          {...props}>
          {content}
        </button>
      )}
      {isLink && (
        <Link className={classList} to={redirect} {...props}>
          {content}
        </Link>
      )}
    </>
  );
};

export default Button;
