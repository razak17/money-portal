import { Box } from '@chakra-ui/react';
import React from 'react';
import {
  TransactionsTable,
  TransactionsPagination,
  TransactionItem,
} from './transactions';
import { LoadingSpinner } from './partials';
import { ApolloQueryResult } from '@apollo/client';
import { TransactionsQuery } from '../generated/graphql';

interface TransactionsListProps {
  count: number | null | undefined;
  limit: number;
  loadingTransactions: boolean;
  TransactionData: TransactionsQuery | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  moreData: (n: number) => Promise<ApolloQueryResult<TransactionsQuery>>
  monthlyTransactions: number | undefined;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
  count,
  limit,
  TransactionData,
  page,
  setPage,
  moreData,
  monthlyTransactions,
  loadingTransactions
}) => {
  return (
    loadingTransactions ? (
        <LoadingSpinner variant="small" />
    ) : TransactionData && count && count > 0 ? (
        <>
        <TransactionsTable>
        {TransactionData.transactions.paginatedTransactions?.transactions.map((t, index) =>
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
          ),
        )}
        </TransactionsTable>
        <TransactionsPagination
          limit={limit}
          page={page}
          setPage={setPage}
          count={count}
          moreData={moreData}
        />
      </>
    ) : (monthlyTransactions && monthlyTransactions > 0) && count === 0 ? (
      <Box p={4} textAlign='center'>No matching records found.</Box>
    ) : !loadingTransactions || !TransactionData?.transactions.paginatedTransactions ?  (
      <Box p={4} textAlign='center'>No transactions yet.</Box>
    ) : (
      <Box p={4} textAlign='center'>We could not find your transactions for some reason.</Box>
    )
  );
};
