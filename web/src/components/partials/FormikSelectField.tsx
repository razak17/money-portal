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
  defaultOption?: string;
  selectOptions: string[];
};

export const FormikSelectField: React.FC<SelectFieldProps> = ({
  label,
  selectOptions,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);

  const options = selectOptions.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  return (
    <FormControl mt={4} isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select {...field} {...props}>
        {[...options]}
      </Select>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
