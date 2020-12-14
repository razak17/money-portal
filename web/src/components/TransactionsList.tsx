import { Box, Text } from "@chakra-ui/react";
import React from "react";
import {
  useTotalTransactionsQuery,
  useTransactionsQuery,
} from "../generated/graphql";
import {
  TransactionsTableEntries,
  TransactionsTable,
  TransactionsPagination,
  TransactionItem,
  TransactionsWrapper,
  TransactionsTableFilters,
} from "./transactions";
import { LoadingSpinner } from "./partials";
import { LIMIT, PAGE, ALL } from "../constants";
import { useGetIntId } from "../utils/useGetIntId";

interface TransactionsListProps {}

export const TransactionsList: React.FC<TransactionsListProps> = () => {
  const [page, setPage] = React.useState(PAGE);
  const [limit, setLimit] = React.useState(LIMIT);
  const [filter, setFilter] = React.useState(ALL);

  const intId = useGetIntId();

  const { data, loading } = useTransactionsQuery({
    variables: {
      bankAccountId: intId,
      limit,
      offset: page,
      filter,
    },
    fetchPolicy: "cache-and-network",
  });
  /* console.log(data); */

  const { data: TotalCount, loading: TotalLoading } = useTotalTransactionsQuery(
    {
      variables: {
        bankAccountId: intId,
        filter,
      },
    }
  );

  if (
    !loading &&
    !TotalLoading &&
    data?.transactions &&
    data?.transactions.transactions.length <= 0
  ) {
    return (
      <TransactionsWrapper>
        <Box textAlign="center" p="1.5rem">
          <Text fontSize="lg">No transactions yet.</Text>
        </Box>
      </TransactionsWrapper>
    );
  }

  return (
    <TransactionsWrapper>
      {TotalCount?.totalTransactions && TotalCount?.totalTransactions > 0 ? (
        <>
          <TransactionsTableFilters
            filter={filter}
            loading={TotalLoading}
            count={TotalCount?.totalTransactions}
            setFilter={setFilter}
            setPage={setPage}
          />
          <TransactionsTableEntries limit={limit} setLimit={setLimit} />
        </>
      ) : null}
      {loading ? (
        <LoadingSpinner variant="small" />
      ) : data?.transactions.transactions ? (
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
      ) : null}
      {TotalCount?.totalTransactions && TotalCount?.totalTransactions > 0 ? (
        <TransactionsPagination
          limit={limit}
          page={page}
          setPage={setPage}
          count={TotalCount?.totalTransactions}
        />
      ) : null}
    </TransactionsWrapper>
  );
};
