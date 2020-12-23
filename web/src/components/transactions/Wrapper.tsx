import React from "react";
import { Box, Flex } from "@chakra-ui/react";

interface TransactionsWrapperProps {
  bg: string
}

export const TransactionsWrapper: React.FC<TransactionsWrapperProps> = ({
  children,
  bg
}) => {
  return (
    <Flex position="relative" flexDir="column" mb="0.5em">
      <Box padding="1rem 1.5rem">
        <Box p={5} bg={bg} shadow="xs" borderWidth="1px" borderRadius="md">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};
