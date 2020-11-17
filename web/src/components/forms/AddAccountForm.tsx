import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { FormInput } from "../FormInput";

interface Props {
  initialRef: any;
  onClose: any;
}

export const AddAccountForm: React.FC<Props> = ({ onClose, initialRef }) => {
  return (
    <>
      <ModalHeader>Add Bank Account</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormInput label="Account Name" placeholder="Account Name" />
        <FormInput
          type="number"
          label="Starting Balance"
          placeholder="Starting Balance"
        />
        <FormInput
          type="number"
          label="Low Alert Balance"
          placeholder="Low Balance Alert"
        />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3}>
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </>
  );
};
