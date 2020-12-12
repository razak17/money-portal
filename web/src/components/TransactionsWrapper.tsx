import React from "react";
import { Box, Flex, Heading, chakra } from "@chakra-ui/react";
import { TransactionsTableFilters } from "./";

interface TransactionsWrapperProps {
  count: number | undefined;
  loading: boolean;
}

export const TransactionsWrapper: React.FC<TransactionsWrapperProps> = ({
  count,
  loading,
  children,
}) => {
  const heading = (
    <Box p="0.5em 0" mr="2.5em">
      <Heading size="md">
        Transactions
        {loading ? (
          <chakra.sub m="0.25em 0 0 0.rem">(...)</chakra.sub>
        ) : count && count > 0 ? (
          <chakra.sub m="0.25em 0 0 0.4em">({count})</chakra.sub>
        ) : null}
      </Heading>
    </Box>
  );

  return (
    <Flex position="relative" flexDir="column" mb="0.5em">
      <Box padding="1rem 1.5rem">
        <Box p={5} shadow="xs" borderWidth="1px" borderRadius="md">
          <Flex flexWrap="wrap" mb="0.5em" p="0 0.5em">
            {heading}
            {count && count > 0 ? <TransactionsTableFilters /> : null}
          </Flex>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};
