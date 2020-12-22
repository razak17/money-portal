import * as React from "react";
import { useColorModeValue, Flex, Box, Button, useDisclosure } from "@chakra-ui/react";
import { CreateAccountModal } from "./";
import { AddIcon } from '@chakra-ui/icons';

interface AddAccountButtonProps {}

export const AddAccountButton: React.FC<AddAccountButtonProps> = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const color = useColorModeValue("brandBlue.500", "green.400")
  const btnHover = useColorModeValue("brandBlue.400", "green.500")
  const btnColor = useColorModeValue("gray.50", "gray.100")

  return (
    <>
      <CreateAccountModal isOpen={isOpen} onClose={onClose} />
      <Flex flexWrap="wrap" mb="1em" p="0.5em 1.5em">
        <Flex flex={1}>
          <Box ml="auto">
            <Button
              size="xs"
              bg={color}
              color={btnColor}
              _hover={{
                bg: btnHover
              }}
              leftIcon={<AddIcon />}
              onClick={onOpen}
            >
              New
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
