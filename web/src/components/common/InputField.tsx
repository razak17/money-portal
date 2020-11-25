import * as React from "react";
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
  amount?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  amount,
  ...props
}) => {
  const [field, { error }] = useField(props);

  let body = null;

  if (amount) {
    body = (
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.400"
          fontSize="1.2em"
          children="$"
        />
        <Input {...props} {...field} id={field.name} />;
      </InputGroup>
    );
  } else {
    body = <Input {...props} {...field} id={field.name} />;
  }

  return (
    <FormControl mt={4} isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {body}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
