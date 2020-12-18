import * as React from "react";
import { Box, FormControl, Flex, Text, Select, Input } from "@chakra-ui/react";
import { FILTER_OPTIONS } from "../../constants";
import { ApolloQueryResult } from '@apollo/client';
import { TransactionsQuery } from '../../generated/graphql';

interface TransactionsTableProps {
  limit: number;
  count: number | undefined;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  limitRefetch: (customLimit: number) => Promise<ApolloQueryResult<TransactionsQuery>>
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export const TransactionsTableEntries: React.FC<TransactionsTableProps> = ({
  count,
  limit,
  setLimit,
  limitRefetch,
  searchQuery,
  setSearchQuery,
}) => {
  const options = FILTER_OPTIONS.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  const entries = (
    <Box w={{ base: "100%", md: "55%", lg: "70%", xl: "70%" }} flex="0 auto">
      <Flex flexWrap="wrap" flex="0 0 auto">
        <Box paddingTop={2}>
          <Text>Show</Text>
        </Box>
        <Box p="0 1em 0 1em" flex="0 0 auto">
          <Select
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              limitRefetch(parseInt(e.target.value))
            }}
          >
            {[...options]}
          </Select>
        </Box>
        <Box paddingTop={2}>
          <Text>Entries</Text>
        </Box>
      </Flex>
    </Box>
  );

  const search = (
    <Box w={{ base: "100%", sm: "70%", md: "45%", lg: "30%", xl: "30%" }} flex="0 auto">
      <Flex
        p={{ base: "1em 0", md: "0" }}
        ml={{ base: "0", md: "auto" }}
        flexWrap="wrap"
        flex="0 auto"
      >
        <Box pt={2}>
          <Text>Search:</Text>
        </Box>
        <Box p="0 0 0 1em" flex="1">
          <FormControl >
            <Input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              variant="outline"
            />
          </FormControl>
        </Box>
      </Flex>
    </Box>
  );

  return (
    count && count > 0 ? (
      <Flex mb="0.5em" flexWrap="wrap" p="0.5em">
        {entries}
        {search}
      </Flex>
    ) : null
  );
};
