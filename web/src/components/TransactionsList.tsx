import { Box, HStack, Text, chakra } from "@chakra-ui/react";
import React from "react";
import { useTransactionsQuery } from "../generated/graphql";
import { useGetIntId } from "../utils/useGetIntId";
import {
  TransactionsTableFilters,
  TransactionsTableEntries,
  TransactionsTable,
  TransactionsPagination,
  TransactionItem,
} from "./";
interface TransactionsListProps {}

export const TransactionsList: React.FC<TransactionsListProps> = () => {
  const intId = useGetIntId();

  const { data, loading } = useTransactionsQuery({
    variables: {
      bankAccountId: intId,
      limit: 10,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return (
      <Box textAlign="center" p="1.5rem">
        <Text fontSize="lg">loading...</Text>
      </Box>
    );
  }

  if (data?.transactions?.transactions.length === 0) {
    return (
      <Box textAlign="center" p="1.5rem">
        <Text fontSize="lg">No transactions yet.</Text>
      </Box>
    );
  }

  return (
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
          <TransactionsTableFilters
            loading={loading}
            count={data?.transactions.transactions.length}
          />
          <Box mt={2}>
            <TransactionsTableEntries />
            <TransactionsTable>
              {data?.transactions &&
                data?.transactions.transactions.map((t, index) =>
                  !t ? null : (
                    <TransactionItem
                      key={t.id}
                      id={t.id}
                      index={index}
                      amount={t.amount}
                      type={t.type}
                      memo={t.memo}
                      updatedAt={t.updatedAt}
                    />
                  )
                )}
            </TransactionsTable>
            <TransactionsPagination />
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};
