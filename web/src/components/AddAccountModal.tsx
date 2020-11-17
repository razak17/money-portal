import React from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { AddAccountForm } from "./forms/AddAccountForm";

interface Props {
  isOpen: any;
  onClose: any;
  initialRef: any;
}

export const AddAccountModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialRef,
}) => {
  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <AddAccountForm onClose={onClose} initialRef={initialRef} />
      </ModalContent>
    </Modal>
  );
};
