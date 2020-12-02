import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import * as React from "react";

interface DeleteTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: any;
}

export const DeleteTransactionModal: React.FC<DeleteTransactionModalProps> = ({
  isOpen,
  onClose,
  handleDelete,
}) => {
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Box mt={4} textAlign="center" p={4}>
          <InfoOutlineIcon w="6rem" h="6rem" color="red.500" />
        </Box>
        <ModalBody textAlign="center" p={4}>
          <Heading size="md">
            Are you sure you want to delete this transaction?
          </Heading>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleDelete}
            type="submit"
            colorScheme="blue"
            mr={3}
          >
            Delete
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
