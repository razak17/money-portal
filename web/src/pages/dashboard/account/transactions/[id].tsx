import * as React from "react";
import { useGetAccountFromUrl, useIsAuth, useGetIntId, withApollo } from "../../../../utils/";
import { useTotalTransactionsQuery, useTransactionsQuery } from '../../../../generated/graphql';
import { LIMIT, PAGE, ALL } from '../../../../constants';
import { Layout, AccountStats,   TransactionsList, AddAccountButton } from "../../../../components";
import {
  AddTransaction,
  TransactionsWrapper,
  TransactionsTableFilters,
  TransactionsTableEntries,
} from "../../../../components/transactions";
import { PageHeader} from "../../../../components/partials";
import { BORDER_BG_LIGHT, BORDER_BG_DARK } from '../../../../constants';
import { useColorModeValue } from "@chakra-ui/react";

interface TransactionsProps {}

const Transactions: React.FC<TransactionsProps> = () => {
  useIsAuth();
  const { data, loading } = useGetAccountFromUrl();
  const intId = useGetIntId();
  console.log("intId", intId);

  const altBg = useColorModeValue("gray.50", "brandDark.700")
  const borderBg = useColorModeValue(BORDER_BG_LIGHT, BORDER_BG_DARK);

  const [page, setPage] = React.useState(PAGE);
  const [limit, setLimit] = React.useState(LIMIT);
  const [filter, setFilter] = React.useState(ALL);
  const [searchQuery, setSearchQuery] = React.useState('');

  console.log("SEARCH QUERY", searchQuery);

  const {
    data: TransactionData,
    loading: TransactionLoading,
    refetch,
    fetchMore
  } = useTransactionsQuery({
    variables: {
      bankAccountId: intId,
      limit,
      offset: page,
      filter,
      query: searchQuery
    },
    // fetchPolicy: "cache-and-network",
    // notifyOnNetworkStatusChange: true,
  });

  const { data: TotalCount, loading: TotalLoading } = useTotalTransactionsQuery(
    {
      variables: {
        bankAccountId: intId,
        filter,
        query: searchQuery
      },
    },
  );

  const moreData = (n: number) => {
    const res = fetchMore({
      variables: {
      offset: n,
      },
    });
    return res;
  };

  const limitRefetch = (customLimit: number) => {
    const res = refetch({
      limit: customLimit,
      offset: PAGE,
    });
    return res;
  };

  const searchRefetch = (query: string) => {
    if (query && query.trim().length < 2) {
      return;
    }
    const res = refetch({
      offset: PAGE,
      query: query
    });
    console.log("SEARCH", res);
    return res;
  };

  return (
    <Layout>
      <PageHeader
        bg={altBg}
        borderBg={borderBg}
        accountLoading={loading}
        type={data?.bankAccount?.type}
        name={data?.bankAccount?.name}
        heading="Transactions"
      />
      <AddAccountButton />
      <AccountStats
        bg={altBg}
        balance={data?.bankAccount?.currentBalance}
        spending={data?.bankAccount?.monthlySpending}
        deposits={data?.bankAccount?.monthlyDeposits}
        monthlyTransactions={data?.bankAccount?.monthlyTransactions}
        loading={loading}
      />
      <AddTransaction bg={altBg} />
      <TransactionsWrapper bg={altBg}>
        <TransactionsTableFilters
          setPage={setPage}
          filter={filter}
          loading={TotalLoading}
          count={TotalCount?.totalTransactions.count}
          monthlyTransactions={data?.bankAccount?.monthlyTransactions}
          setFilter={setFilter}
        />
        <TransactionsTableEntries
          monthlyTransactions={data?.bankAccount?.monthlyTransactions}
          limit={limit}
          setLimit={setLimit}
          count={TotalCount?.totalTransactions.count}
          limitRefetch={limitRefetch}
          searchRefetch={searchRefetch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <TransactionsList
          monthlyTransactions={data?.bankAccount?.monthlyTransactions}
          count={TotalCount?.totalTransactions.count}
          limit={limit}
          loadingTransactions={TransactionLoading || TotalLoading || loading}
          TransactionData={TransactionData}
          page={page}
          setPage={setPage}
          moreData={moreData}
        />
      </TransactionsWrapper>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Transactions);
