import TextareaAutosize from "react-textarea-autosize";

import { useControlledField } from "../../../hooks/useControlledField";

import styles from "./Input.module.scss";

const Input = ({
  name,
  control,
  multiline = false,
  fullWidth = false,
  label = "",
  rules = {},
  type = "text",
  defaultValue = "",
  ...props
}) => {
  const { field, error, invalid } = useControlledField({
    name,
    control,
    rules,
    defaultValue,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    if (type === "number") {
      const parsed = value === "" ? "" : Number(value);
      field.onChange(parsed);
    } else {
      field.onChange(value);
    }
  };

  const classList = `${styles["input"]} ${
    fullWidth ? styles["fullwidth"] : ""
  } ${error ? styles["error"] : ""} ${invalid ? styles["invalid"] : ""}`;

  return (
    <div className={styles["input-wrapper"]}>
      {label && (
        <label className={styles["input-label"]} htmlFor={name}>
          {label}
        </label>
      )}

      {multiline ? (
        <TextareaAutosize
          {...field}
          id={name}
          className={`${classList} ${styles["textarea"]}`}
          minRows={5}
          onChange={handleChange}
          {...props}
        />
      ) : (
        <input
          {...field}
          id={name}
          className={classList}
          type={type}
          step={type === "number" ? "any" : undefined}
          onChange={handleChange}
          {...props}
        />
      )}

      {error && <p className={styles["input-error"]}>{error.message}</p>}
    </div>
  );
};

export default Input;
