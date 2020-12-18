import * as React from "react";
import { Flex, Box, Button, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import { CreateAccountModal } from "./";

interface AddAccountButtonProps {}

export const AddAccountButton: React.FC<AddAccountButtonProps> = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <CreateAccountModal isOpen={isOpen} onClose={onClose} />
      <Flex flexWrap="wrap" mb="1em" p="0.5em 1.5em">
        <Flex flex={1}>
          <Box ml="auto">
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              onClick={onOpen}
            >
              Add Account
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
