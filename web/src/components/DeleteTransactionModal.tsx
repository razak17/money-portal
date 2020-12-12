import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import * as React from "react";
import { useDeleteTransactionMutation } from "../generated/graphql";

interface DeleteTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  bankAccountId: number;
}

export const DeleteTransactionModal: React.FC<DeleteTransactionModalProps> = ({
  isOpen,
  onClose,
  id,
  bankAccountId,
}) => {
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const initialRef = React.useRef<HTMLButtonElement>(null);
  const [deleteTransaction] = useDeleteTransactionMutation();

  return (
    <Modal
      initialFocusRef={initialRef}
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <Box mt={4} textAlign="center" p={4}>
          <InfoOutlineIcon w="6rem" h="6rem" color="red.500" />
        </Box>
        <ModalBody textAlign="center" p={4}>
          <Text fontSize="lg">
            Are you sure you want to delete this transaction?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              setDeleteLoading(true);
              deleteTransaction({
                variables: {
                  id: id,
                  bankAccountId,
                },
                update: (cache) => {
                  // Transaction: 77
                  cache.evict({ id: "Transaction:" + id });
                  cache.evict({ fieldName: "totalTransactions" });
                  cache.evict({ fieldName: "transactions" });
                  cache.evict({ fieldName: "bankAccount" });
                },
              });
              setDeleteLoading(false);
              onClose();
            }}
            isLoading={deleteLoading}
            type="submit"
            colorScheme="red"
            mr={3}
          >
            Delete
          </Button>
          <Button ref={initialRef} colorScheme="blue" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
