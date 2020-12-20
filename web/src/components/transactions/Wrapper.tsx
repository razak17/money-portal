import React from "react";
import { useColorModeValue, Box, Flex } from "@chakra-ui/react";

interface TransactionsWrapperProps {}

export const TransactionsWrapper: React.FC<TransactionsWrapperProps> = ({
  children,
}) => {
  const bg = useColorModeValue("whiteAlpha.800", "brandDark.400")
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
