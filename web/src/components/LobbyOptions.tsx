import { Box, HStack, Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface LobbyOptionsProps {
  onOpen: any;
}

export const LobbyOptions: React.FC<LobbyOptionsProps> = ({ onOpen }) => {
  return (
    <Box padding="0 2rem" marginBottom="2rem">
      <HStack spacing={8}>
        <Box
          cursor="pointer"
          onClick={onOpen}
          p={4}
          maxWidth="33%"
          shadow="xs"
          borderWidth="1px"
          flex="1"
          borderRadius="md"
        >
          <Flex justifyContent="center" mb={2}>
            <Heading size="md">Add Account</Heading>
          </Flex>
          <Flex justifyContent="center">
            <Heading size="md">Icon Here</Heading>
          </Flex>
        </Box>
      </HStack>
    </Box>
  );
};
