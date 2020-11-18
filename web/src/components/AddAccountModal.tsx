import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import { AddAccountForm } from "./forms/AddAccountForm";

interface Props {
  isOpen: any;
  onClose: any;
}

export const AddAccountModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Bank Account</ModalHeader>
        <ModalCloseButton />
        <AddAccountForm onClose={onClose} />
      </ModalContent>
    </Modal>
  );
};
