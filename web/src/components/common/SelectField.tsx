import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type SelectFieldProps = React.InputHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  defaultOption: string;
  selectOptions: string[];
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  selectOptions,
  defaultOption,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const defaultOptionValue = (
    <option key="default" value={defaultOption}>
      {defaultOption}
    </option>
  );
  const options = selectOptions.map((option) => (
    <option key={Math.random()} value={option}>
      {option}
    </option>
  ));

  return (
    <FormControl mt={4} isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select {...field} {...props}>
        {[defaultOptionValue, ...options]}
      </Select>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
