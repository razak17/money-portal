import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useTransactionsQuery } from "../generated/graphql";
import { useGetIntId } from "../utils/useGetIntId";
import {
  TransactionsTableEntries,
  TransactionsTable,
  TransactionsPagination,
  TransactionItem,
  TransactionsWrapper,
} from "./";
import { LIMIT } from "../constants";

interface TransactionsListProps {}

export const TransactionsList: React.FC<TransactionsListProps> = () => {
  const intId = useGetIntId();

  const { data, loading } = useTransactionsQuery({
    variables: {
      bankAccountId: intId,
      limit: LIMIT,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  // console.log(data?.transactions);

  if (loading) {
    return (
      <TransactionsWrapper loading={loading} count={data?.transactions.count}>
        <Box textAlign="center" p="1.5rem">
          <Text fontSize="lg">loading...</Text>
        </Box>
      </TransactionsWrapper>
    );
  }

  if (!data?.transactions || data?.transactions?.count === 0) {
    return (
      <TransactionsWrapper loading={loading} count={data?.transactions.count}>
        <Box textAlign="center" p="1.5rem">
          <Text fontSize="lg">No transactions yet.</Text>
        </Box>
      </TransactionsWrapper>
    );
  }

  return (
    <TransactionsWrapper loading={loading} count={data?.transactions.count}>
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
      <TransactionsPagination count={data?.transactions.count} />
    </TransactionsWrapper>
  );
};
