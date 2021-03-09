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
  name: string;
  label?: string;
  amount?: boolean;
  elementRef?: React.RefObject<HTMLInputElement>;
};

export const FormikInputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  amount,
  elementRef = null,
  ...props
}) => {
  const [field, { error }] = useField(props);

  let body = null;

  if (amount) {
    body = (
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="white.200"
          fontSize="1.2em"
          children="$"
        />
        <Input ref={elementRef} {...props} {...field} id={field.name} />;
      </InputGroup>
    );
  } else {
    body = <Input ref={elementRef} {...props} {...field} id={field.name} />;
  }

  return (
    <FormControl mt={label ? 4 : 0} isInvalid={!!error}>
      {label ? <FormLabel htmlFor={field.name}>{label}</FormLabel> : null}
      {body}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

