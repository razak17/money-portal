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
  selectOptions: string[];
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  selectOptions,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const defaultOption = (
    <option key="default" value="Select Account Type">
      Select Account Type
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
        {[defaultOption, ...options]}
      </Select>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
