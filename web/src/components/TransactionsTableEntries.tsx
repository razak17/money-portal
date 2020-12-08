import * as React from "react";
import { Box, Flex, Text, Select, Input } from "@chakra-ui/react";

interface Props {}

export const TransactionsTableEntries: React.FC<Props> = () => {
  return (
    <Flex mb="0.5em" flexWrap="wrap" p="0.5em">
      <Flex mr="4.5em" flexWrap="wrap" flex="0 0 auto">
        <Box paddingTop={2}>
          <Text>Show</Text>
        </Box>
        <Box p="0 1em 0 1em" flex="0 0 auto">
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
      <Flex
        p={{ base: "1em 0", md: "0" }}
        ml={{ base: "auto", sm: "0", md: "auto" }}
        flexWrap="wrap"
        flex="0 0 auto"
      >
        <Box pt={2}>
          <Text>Search:</Text>
        </Box>
        <Box p="0 0 0 1em" flex="1">
          <Input variant="outline" />
        </Box>
      </Flex>
    </Flex>
  );
};
