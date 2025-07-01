import { useControlledField } from "../../../hooks/useControlledField";

import styles from "./DatePicker.module.scss";

const DatePicker = ({
  name,
  control,
  label,
  fullWidth = false,
  rules = {},
  defaultValue = "",
}) => {
  const { field, error, invalid } = useControlledField({
    name,
    control,
    rules,
    defaultValue,
  });

  const classList = `${styles["date-picker"]} ${
    fullWidth ? styles["fullwidth"] : ""
  } ${error ? styles["error"] : ""} ${invalid ? styles["invalid"] : ""}`;

  return (
    <>
      <div
        className={`${styles["date-picker-wrapper"]} ${
          fullWidth ? styles["fullwidth"] : ""
        }`}>
        {label && (
          <label htmlFor={name} className={styles["date-picker-label"]}>
            {label}
          </label>
        )}
        <input
          type='datetime-local'
          id={name}
          name={name}
          step='600'
          className={classList}
          {...field}
        />
        {error && <p className={styles["error-message"]}>{error.message}</p>}
      </div>
    </>
  );
};

export default DatePicker;
