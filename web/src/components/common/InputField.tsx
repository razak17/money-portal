import React from "react";
import {
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  type: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);

  let body = null;
  if (type === "number") {
    body = (
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children="$"
        />
        <Input {...props} {...field} id={field.name} />;
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </InputGroup>
    );
  }

  if (type === "text") {
    body = <Input {...props} {...field} id={field.name} />;
  }

  return (
    <FormControl mt={4} isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {body}
    </FormControl>
  );
};
