import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import {
  useTotalTransactionsQuery,
  useTransactionsQuery,
} from '../generated/graphql';
import {
  TransactionsTableEntries,
  TransactionsTable,
  TransactionsPagination,
  TransactionItem,
  TransactionsWrapper,
  TransactionsTableFilters,
} from './transactions';
import { LoadingSpinner } from './partials';
import { LIMIT, PAGE, ALL } from '../constants';
import { useGetIntId } from '../utils/useGetIntId';

interface TransactionsListProps {}

export const TransactionsList: React.FC<TransactionsListProps> = () => {
  const [page, setPage] = React.useState(PAGE);
  const [limit, setLimit] = React.useState(LIMIT);
  const [filter, setFilter] = React.useState(ALL);
  const [searchQuery, setSearchQuery] = React.useState('');

  const intId = useGetIntId();
  console.log(searchQuery);

  const { data, loading, refetch, fetchMore } = useTransactionsQuery({
    variables: {
      bankAccountId: intId,
      limit,
      offset: page,
      search: searchQuery
    },
    // fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const { data: TotalCount, loading: TotalLoading } = useTotalTransactionsQuery(
    {
      variables: {
        bankAccountId: intId,
        filter,
      },
    },
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

  const moreData = (n: number) => {
    const res = fetchMore({
      variables: {
      limit,
      offset: n,
      },
    });
    return res;
  };


  return (
    <TransactionsWrapper>
    </TransactionsWrapper>
  );
};
