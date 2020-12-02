import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  Button,
  ButtonGroup,
  Select,
  Input,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import {
  useTransactionsQuery,
  useDeleteTransactionMutation,
} from "../generated/graphql";
import { filterOptions } from "../types";
import { useGetIntId } from "../utils/useGetIntId";
import { EditDeleteTransactionButton } from "./EditDeleteTransactionButton";
import { DeleteTransactionModal } from "./DeleteTransactionModal";

interface TransactionsListProps {}

export const TransactionsList: React.FC<TransactionsListProps> = () => {
  const intId = useGetIntId();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const { data, fetchMore, loading, variables } = useTransactionsQuery({
    variables: {
      bankAccountId: intId,
      limit: 10,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const [deleteTransaction] = useDeleteTransactionMutation();
  console.log("transactions", data);

  const handleDelete = async (tid: number, bankAccountId: number) => {
    await deleteTransaction({
      variables: {
        id: tid,
        bankAccountId,
      },
    });
  };

  const nav = (
    <Flex mb="1rem">
      <Flex flexWrap="wrap">
        <Heading size="md">Transactions</Heading>
        {loading && <Text m="0.25rem 0 0 0.4rem">(-)</Text>}
        {data?.transactions && (
          <Text m="0.25rem 0 0 0.4rem">
            ({data?.transactions.transactions.length})
          </Text>
        )}
      </Flex>
      <Flex ml="auto" flexWrap="wrap">
        <ButtonGroup variant="outline" spacing="4">
          {filterOptions.map((option, index) => (
            <Button key={index} variant={option.active ? "solid" : "link"}>
              {option.name}
            </Button>
          ))}
        </ButtonGroup>
        <Box
          width="auto"
          maxW="100%"
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
          <Input variant="outline" placeholder="Outline" />
        </Box>
      </Flex>
    </Flex>
  );

  const table = (
    <>
      <chakra.table
        borderBottom="1px solid black"
        boxSizing="content-box"
        margin="0 auto"
        width="100%"
      >
        <chakra.thead borderWidth="1px" borderRadius="md" bg="gray.200">
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
            <chakra.th width="200px" padding="0.5rem 1rem">
              Options
            </chakra.th>
          </chakra.tr>
        </chakra.thead>
        <chakra.tbody>
          {data?.transactions &&
            data?.transactions.transactions.map((t) => (
              <chakra.tr borderWidth="1px" borderRadius="md" key={t.id}>
                <chakra.td textAlign="center" p="1rem">
                  <Heading size="xs">{t.amount}</Heading>
                </chakra.td>
                <chakra.td textAlign="center" p="1rem">
                  <Heading size="xs">{t.memo}</Heading>
                  <Text fontSize="xs">{t.type}</Text>
                </chakra.td>
                <chakra.td textAlign="center" p="1rem">
                  <Heading size="xs">{t.createdAt}</Heading>
                  <Text fontSize="sm">{t.createdAt}</Text>
                </chakra.td>
                <chakra.td>
                  <DeleteTransactionModal
                    handleDelete={() => handleDelete(t.id, intId)}
                    isOpen={isOpenDelete}
                    onClose={onCloseDelete}
                  />
                  <EditDeleteTransactionButton onOpenDelete={onOpenDelete} />
                </chakra.td>
              </chakra.tr>
            ))}
        </chakra.tbody>
      </chakra.table>
      {loading && (
        <Box textAlign="center" p="1.5rem">
          <Text fontSize="lg">loading...</Text>
        </Box>
      )}
      {data?.transactions?.transactions.length === 0 && (
        <Box textAlign="center" p="1.5rem">
          <Text fontSize="lg">No transactions yet.</Text>
        </Box>
      )}
    </>
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
          {data && data.transactions.hasMore ? (
            <Button
              onClick={() => {
                fetchMore({
                  variables: {
                    limit: variables?.limit,
                    cursor:
                      data?.transactions.transactions[
                        data.transactions.transactions.length - 1
                      ].createdAt,
                  },
                });
              }}
              p="0.5rem 1rem"
              variant="link"
            >
              Next
            </Button>
          ) : null}
        </ButtonGroup>
      </Box>
    </Flex>
  );

  return (
    <>
      <Box padding="0 2rem" mb="2rem" mt="2rem">
        <HStack spacing={8}>
          <Box
            p={5}
            maxW="100%"
            shadow="md"
            borderWidth="1px"
            flex="1"
            borderRadius="md"
          >
            {nav}
            <Box mt={2}>
              <Box>{filters}</Box>
              {table}
              <Box>{pagination}</Box>
            </Box>
          </Box>
        </HStack>
      </Box>
    </>
  );
};
