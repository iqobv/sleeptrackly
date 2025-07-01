import { useController } from "react-hook-form";

export const useControlledField = ({
  name,
  control,
  rules,
  defaultValue = "",
}) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return {
    field,
    error,
    invalid,
  };
};
