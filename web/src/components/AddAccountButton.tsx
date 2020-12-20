import * as React from "react";
import { useColorModeValue, Flex, Box, Button, useDisclosure } from "@chakra-ui/react";
import { CreateAccountModal } from "./";
import { AddIcon } from '@chakra-ui/icons';

interface AddAccountButtonProps {}

export const AddAccountButton: React.FC<AddAccountButtonProps> = () => {
  const color = useColorModeValue("brandBlue.700", "green.500")
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <CreateAccountModal isOpen={isOpen} onClose={onClose} />
      <Flex flexWrap="wrap" mb="1em" p="0.5em 1.5em">
        <Flex flex={1}>
          <Box ml="auto">
            <Button
              size="xs"
              leftIcon={<AddIcon />}
              color={color}
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
