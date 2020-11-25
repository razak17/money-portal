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
  IconButton,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface TransactionsListProps {}

// Hello
const filterOptions = [
  { id: "1", name: "All", active: true },
  { id: "2", name: "Withdrawals", active: false },
  { id: "3", name: "Deposits", active: false },
  { id: "4", name: "Transfers", active: false },
];

const transactionOptions = [
  {
    id: "1",
    amount: "$222",
    memo: "memo",
    date: "Tuesday, 17 November 2020",
    time: "6:45PM",
  },
  {
    id: "2",
    amount: "$222",
    memo: "memo",
    date: "Tuesday, 17 November 2020",
    time: "6:45PM",
  },
  {
    id: "3",
    amount: "$222",
    memo: "memo",
    date: "Tuesday, 17 November 2020",
    time: "6:45PM",
  },
  {
    id: "4",
    amount: "$222",
    memo: "memo",
    date: "Tuesday, 17 November 2020",
    time: "6:45PM",
  },
  {
    id: "5",
    amount: "$222",
    memo: "memo",
    date: "Tuesday, 17 November 2020",
    time: "6:45PM",
  },
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
          <chakra.th width="288px" padding="0.5rem 1rem">
            Options
          </chakra.th>
        </chakra.tr>
      </chakra.thead>
      <chakra.tbody>
        {transactionOptions.map((t) => (
          <chakra.tr bg="green.200" key={t.id}>
            <chakra.td textAlign="center" p="1.5rem">
              <Heading size="xs">{t.amount}</Heading>
            </chakra.td>
            <chakra.td textAlign="center" p="1.5rem">
              <Heading size="xs">{t.memo}</Heading>
              <Text fontSize="sm">Transfer</Text>
            </chakra.td>
            <chakra.td textAlign="center" p="1.5rem">
              <Heading size="xs">{t.date}</Heading>
              <Text fontSize="sm">{t.time}</Text>
            </chakra.td>
            <Flex
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center"
              p="1.5rem"
            >
              <chakra.td>
                <IconButton
                  as={Link}
                  colorScheme="teal"
                  mr={4}
                  icon={<EditIcon />}
                  aria-label="Edit Transaction"
                />
              </chakra.td>
              <chakra.td>
                <IconButton
                  as={Link}
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  aria-label="Delete Transaction"
                />
              </chakra.td>
            </Flex>
          </chakra.tr>
        ))}
      </chakra.tbody>
    </chakra.table>
  );

  const pagination = (
    <Flex p="1rem 0 1rem 0" flexWrap="wrap">
      <Text> Showing 10 of entries of 40</Text>
      <Box ml="auto">
        <ButtonGroup variant="outline" spacing="1">
          <Button p="0.5rem 1rem" variant="link">
            Previous
          </Button>
          <Button variant="solid">1</Button>
          <Button variant="link">2</Button>
          <Button variant="link">3</Button>
          <Button variant="link">4</Button>
          <Button variant="link">5</Button>
          <Button p="0.5rem 1rem" variant="link">
            Next
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
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
          <Box marginTop={2}>
            <Box>{filters}</Box>
            {table}
            <Box>{pagination}</Box>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};
