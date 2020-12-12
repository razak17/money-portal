import { Box, Text } from "@chakra-ui/react";
import React from "react";
import {
  useTotalTransactionsQuery,
  useTransactionsQuery,
} from "../generated/graphql";
import { useGetIntId } from "../utils/useGetIntId";
import {
  TransactionsTableEntries,
  TransactionsTable,
  TransactionsPagination,
  TransactionItem,
  TransactionsWrapper,
} from "./";
import { LIMIT, PAGE } from "../constants";

interface TransactionsListProps {}

export const TransactionsList: React.FC<TransactionsListProps> = () => {
  const [page, setPage] = React.useState(PAGE);
  const [limit, setLimit] = React.useState(LIMIT);

  const intId = useGetIntId();

  const { data, fetchMore, variables, loading } = useTransactionsQuery({
    variables: {
      bankAccountId: intId,
      limit,
      offset: page,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { data: TotalCount, loading: TotalLoading } = useTotalTransactionsQuery(
    {
      variables: {
        bankAccountId: intId,
      },
    }
  );

  if (loading || TotalLoading) {
    return (
      <TransactionsWrapper
        loading={loading}
        count={TotalCount?.totalTransactions}
      >
        <Box textAlign="center" p="1.5rem">
          <Text fontSize="lg">loading...</Text>
        </Box>
      </TransactionsWrapper>
    );
  }

  if (!loading && !TotalLoading && !data?.transactions.transactions.length) {
    return (
      <TransactionsWrapper
        loading={loading}
        count={TotalCount?.totalTransactions}
      >
        <Box textAlign="center" p="1.5rem">
          <Text fontSize="lg">No transactions yet.</Text>
        </Box>
      </TransactionsWrapper>
    );
  }

  const moreData = (n: number) => {
    const res = fetchMore({
      variables: {
        limit: variables?.limit,
        offset: n,
      },
    });
    return res;
  };

  return (
    <TransactionsWrapper
      loading={loading}
      count={TotalCount?.totalTransactions}
    >
      {TotalCount?.totalTransactions && TotalCount?.totalTransactions > 0 ? (
        <>
          <TransactionsTableEntries limit={limit} setLimit={setLimit} />
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
          <TransactionsPagination
            limit={limit}
            page={page}
            setPage={setPage}
            fetchMore={moreData}
            count={TotalCount?.totalTransactions}
          />
        </>
      ) : null}
    </TransactionsWrapper>
  );
};
