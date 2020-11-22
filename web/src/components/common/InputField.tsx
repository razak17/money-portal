import React, { useEffect, useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
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
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(value);
  }, [value]);

  let body = null;
  if (type === "number") {
    const format = (val: string) => `$${val}`;
    const parse = (val: string) => val.replace(/^\$/, "");
    // const parse = (val: string) => val;

    body = (
      <NumberInput
        onChange={(valueString) => {
          setValue(parse(valueString));
        }}
        value={format(value)}
        min={0}
        allowMouseWheel
      >
        <NumberInputField {...props} {...field} id={field.name} />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    );
  }

  // const numberInput = (
  //   <InputGroup>
  //     <InputLeftElement
  //       pointerEvents="none"
  //       color="gray.100"
  //       fontSize="1.2em"
  //       children="$"
  //     />
  //     <Input {...props} {...field} id={field.name} />;
  //     {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
  //     <InputRightElement
  //       borderLeft={1}
  //       pointerEvents="none"
  //       color="gray.100"
  //       fontSize="1.2em"
  //       children=".00"
  //     />
  //   </InputGroup>
  // );

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
