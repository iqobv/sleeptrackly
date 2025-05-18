import { useFormContext } from "react-hook-form";

import Textarea from "../../Textarea/Textarea";

import styles from "./TextareaField.module.scss";

const TextareaField = ({ field, ...props }) => {
  const { register } = useFormContext();

  return <Textarea fieldName={field?.name} register={register(field.name)} />;
};

export default TextareaField;
