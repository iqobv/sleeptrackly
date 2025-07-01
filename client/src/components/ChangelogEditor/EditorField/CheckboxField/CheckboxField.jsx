import { useFormContext } from "react-hook-form";

import styles from "./CheckboxField.module.scss";

const CheckboxField = ({ field, ...props }) => {
  const { register } = useFormContext();

  return (
    <input
      type='checkbox'
      {...register(field.name)}
      id={field.name}
      name={field.name}
    />
  );
};

export default CheckboxField;
