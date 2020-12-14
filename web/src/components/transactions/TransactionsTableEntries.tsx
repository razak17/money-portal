import * as React from "react";
import { Box, Flex, Text, Select, Input } from "@chakra-ui/react";
import { FILTER_OPTIONS } from "../../constants";

interface TransactionsTableProps {
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export const TransactionsTableEntries: React.FC<TransactionsTableProps> = ({
  limit,
  setLimit,
}) => {
  const options = FILTER_OPTIONS.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  const entries = (
    <Box w={{ base: "100%", md: "70%", xl: "70%" }} flex="0 auto">
      <Flex flexWrap="wrap" flex="0 0 auto">
        <Box paddingTop={2}>
          <Text>Show</Text>
        </Box>
        <Box p="0 1em 0 1em" flex="0 0 auto">
          <Select
            value={limit}
            onChange={(e) => {
              console.log("selected", e.target.value);
              setLimit(parseInt(e.target.value));
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
    <Box w={{ base: "100%", sm: "50%", md: "30%", xl: "30%" }} flex="0 auto">
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
          <Input variant="outline" />
        </Box>
      </Flex>
    </Box>
  );

  return (
    <Flex mb="0.5em" flexWrap="wrap" p="0.5em">
      {entries}
      {search}
    </Flex>
  );
};
