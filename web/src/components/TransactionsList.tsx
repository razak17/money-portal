import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  Link as ChakraLink,
  Button,
  ButtonGroup,
  Select,
  Input,
  chakra,
} from "@chakra-ui/react";
import React from "react";

interface TransactionsListProps {}

// Hello
const filterOptions = [
  { id: "1", name: "All", active: true },
  { id: "2", name: "Withdrawals", active: false },
  { id: "3", name: "Deposits", active: false },
  { id: "4", name: "Transfers", active: false },
];

export const TransactionsList: React.FC<TransactionsListProps> = () => {
  const nav = (
    <Flex marginBottom="1rem">
      <Flex flexWrap="wrap">
        <Heading size="md">Transactions</Heading>
        <Text m="0.25rem 0 0 0.4rem">(7)</Text>
      </Flex>
      <Flex ml="auto" flexWrap="wrap">
        <ButtonGroup variant="outline" spacing="4">
          {filterOptions.map((option) => (
            <Button key={option.id} variant={option.active ? "solid" : "link"}>
              {option.name}
            </Button>
          ))}
        </ButtonGroup>
        <Box
          width="auto"
          maxWidth="100%"
          cursor="pointer"
          flex="0 0 auto"
          position="relative"
          ml={6}
          alignItems="center"
          paddingTop={1}
        >
          <Heading size="md">x</Heading>
        </Box>
      </Flex>
    </Flex>
  );

  const filters = (
    <Flex marginBottom="1rem">
      <Flex flexWrap="wrap" flex="0 0 20%">
        <Box paddingTop={2}>
          <Text>Show</Text>
        </Box>
        <Box p="0 1rem 0 1rem" flex="0 0 40%" maxWidth="40%">
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
        <Box paddingTop={2}>
          <Text>Search:</Text>
        </Box>
        <Box p="0 0 0 1rem" flex="1">
          <Input variant="outline" placeholder="Outline" />
        </Box>
      </Flex>
    </Flex>
  );

  const table = (
    <chakra.table
      borderBottom="1px solid black"
      boxSizing="content-box"
      margin="0 auto"
      width="100%"
    >
      <chakra.thead bg="gray.200">
        <chakra.tr role="row">
          <chakra.th width="149px" padding="0.5rem 1rem">
            Amount
          </chakra.th>
          <chakra.th width="362px" padding="0.5rem 1rem">
            Memo
          </chakra.th>
          <chakra.th width="288px" padding="0.5rem 1rem">
            Date
          </chakra.th>
        </chakra.tr>
      </chakra.thead>
      <chakra.tbody>
        <chakra.tr bg="green.200">
          <chakra.td textAlign="center" p="0.5rem">
            <Heading size="xs">$2,220</Heading>
          </chakra.td>
          <chakra.td textAlign="center" p="0.5rem">
            <Heading size="xs">Test Transfer</Heading>
            <Text fontSize="sm">Transfer</Text>
          </chakra.td>
          <chakra.td textAlign="center" p="0.5rem">
            <Heading size="xs">Tuesday, 17 November 2020</Heading>
            <Text fontSize="sm">6:45PM</Text>
          </chakra.td>
        </chakra.tr>
      </chakra.tbody>
    </chakra.table>
  );

  return (
    <Box padding="0 2rem" marginBottom="2rem">
      <HStack spacing={8}>
        <Box
          p={5}
          maxWidth="100%"
          shadow="md"
          borderWidth="1px"
          flex="1"
          borderRadius="md"
        >
          {nav}
          <Box>
            <Box marginTop={2}>
              <Box>{filters}</Box>
              <Box>{table}</Box>
            </Box>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};
