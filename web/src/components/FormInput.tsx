import React from "react";
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface Props {
  label: string;
  type?: string;
  placeholder: string;
}

export const FormInput: React.FC<Props> = ({
  label,
  type = "text",
  placeholder,
}) => {
  return (
    <FormControl mt={4}>
      <FormLabel>{label}</FormLabel>
      <Input type={type} placeholder={placeholder} />
    </FormControl>
  );
};
