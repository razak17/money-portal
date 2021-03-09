import * as React from "react";
import { useColorModeValue, Flex, Box, Button, useDisclosure } from "@chakra-ui/react";
import { CreateAccountModal } from "./";

interface AddAccountButtonProps {}

export const AddAccountButton: React.FC<AddAccountButtonProps> = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnHover = useColorModeValue("brandBlue.400", "brandGreen.600")
  const btnColor = useColorModeValue("gray.50", "gray.200")
  const btnBg = useColorModeValue("brandBlue.500", "brandGreen.500")

  return (
    <>
      <CreateAccountModal isOpen={isOpen} onClose={onClose} />
      <Flex flexWrap="wrap" mb="1em" p="0.5em 1.5em">
        <Flex flex={1}>
          <Box ml="auto">
            <Button
              size="xs"
              bg={btnBg}
              color={btnColor}
              _hover={{
                bg: btnHover
              }}
              onClick={onOpen}
            >
              New Account
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
