import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import React from "react";

type SelectFieldProps = React.InputHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  name: string;
  defaultOption?: string;
  selectOptions: string[];
  error?: any;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  selectOptions,
  size: _,
  error,
  ...props
}) => {
  const field = props;

  const options = selectOptions.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  return (
    <FormControl isInvalid={error ? !!error : false}>
      {label ? <FormLabel htmlFor={field.name}>{label}</FormLabel> : null}
      <Select {...field} {...props}>
        {[...options]}
      </Select>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
