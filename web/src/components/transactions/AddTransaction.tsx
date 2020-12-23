import * as React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { AddTransactionForm } from "../forms";

interface AddTransactionProps {
  bg: string;
}

export const AddTransaction: React.FC<AddTransactionProps> = ({ bg  }) => {

  const heading = (
    <Flex m={0} p={2}>
      <Heading size="sm">Add Transaction</Heading>
    </Flex>
  );

  return (
    <Box padding="0 0.5rem" mb="1rem">
      <Flex flexWrap="wrap" padding="0 1rem" mb="1rem">
        <Box
          bg={bg}
          p={5}
          maxW="100%"
          shadow="xs"
          borderWidth="1px"
          flex="1"
          borderRadius="md"
        >
          {heading}
          <Box mt="0.5rem">
            <AddTransactionForm />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
