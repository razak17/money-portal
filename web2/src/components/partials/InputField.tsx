import * as React from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputLeftElement,
  FormErrorMessage,
} from "@chakra-ui/react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  amount?: boolean;
  elementRef?: React.RefObject<HTMLInputElement>;
  error: any;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  amount = false,
  elementRef: ref = null,
  error,
  ...props
}) => {
  const field = props;

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
        <Input ref={ref} {...props} type="number" id={field.name} />
      </InputGroup>
    );
  } else {
    body = <Input ref={ref} {...props} type="text" id={field.name} />;
  }
  return (
    <FormControl isInvalid={error ? !!error : false}>
      {label ? <FormLabel htmlFor={field.name}>{label}</FormLabel> : null}
      {body}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
