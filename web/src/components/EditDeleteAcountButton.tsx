import { Flex, Box, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { EditAccountModal, DeleteAccountModal } from "./";

interface EditSelectButtonProps {}

export const EditDeleteAccountButton: React.FC<EditSelectButtonProps> = () => {
  const {
    onOpen: EditOpen,
    onClose: EditClose,
    isOpen: EditIsOpen,
  } = useDisclosure();
  const {
    onOpen: DeleteOpen,
    onClose: DeleteClose,
    isOpen: DeleteIsOpen,
  } = useDisclosure();

  return (
    <>
      <EditAccountModal isOpen={EditIsOpen} onClose={EditClose} />
      <DeleteAccountModal isOpen={DeleteIsOpen} onClose={DeleteClose} />

      <Flex flexWrap="wrap" mb="1rem" p="1.5rem">
        <Flex flex={1}>
          <Box ml="auto">
            <Button onClick={EditOpen}>Edit Account</Button>
            <Button bg="red.500" ml={4} onClick={DeleteOpen}>
              Delete Account
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
