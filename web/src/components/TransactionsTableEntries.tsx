import * as React from "react";
import { Box, Flex, Text, Select, Input } from "@chakra-ui/react";

interface Props {}

export const TransactionsTableEntries: React.FC<Props> = () => {
  return (
    <Flex mb="1rem">
      <Flex flexWrap="wrap" flex="0 0 20%">
        <Box paddingTop={2}>
          <Text>Show</Text>
        </Box>
        <Box p="0 1rem 0 1rem" flex="0 0 40%" maxW="40%">
          <Select placeholder="10">
            <option value="option1">25</option>
            <option value="option2">50</option>
            <option value="option3">100</option>
          </Select>
        </Box>
        <Box paddingTop={2}>
          <Text>Entries</Text>
        </Box>
      </Flex>
      <Flex ml="auto" flexWrap="wrap" flex="0 0 20%">
        <Box pt={2}>
          <Text>Search:</Text>
        </Box>
        <Box p="0 0 0 1rem" flex="1">
          <Input variant="outline" />
        </Box>
      </Flex>
    </Flex>
  );
};
