import * as React from "react";
import { Box, Flex, Text, Select, Input } from "@chakra-ui/react";

interface TransactionsTableProps {
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const OPTIONS = [10, 25, 50, 100];

export const TransactionsTableEntries: React.FC<TransactionsTableProps> = ({
  limit,
  setLimit,
}) => {
  const options = OPTIONS.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  return (
    <Flex mb="0.5em" flexWrap="wrap" p="0.5em">
      <Flex mr="4.5em" flexWrap="wrap" flex="0 0 auto">
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
