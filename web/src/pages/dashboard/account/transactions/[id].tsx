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

interface TransactionsProps {}

const Transactions: React.FC<TransactionsProps> = () => {
  useIsAuth();
  const { data, loading } = useGetAccountFromUrl();
  const intId = useGetIntId();
  console.log("intId", intId);

  const [page, setPage] = React.useState(PAGE);
  const [limit, setLimit] = React.useState(LIMIT);
  const [filter, setFilter] = React.useState(ALL);
  const [searchQuery, setSearchQuery] = React.useState('');

  console.log(searchQuery);

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
      search: null
    },
    // notifyOnNetworkStatusChange: true,
  });

  const { data: TotalCount, loading: TotalLoading } = useTotalTransactionsQuery(
    {
      variables: {
        bankAccountId: intId,
        filter,
      },
    },
  );


  const moreData = (n: number) => {
    const res = fetchMore({
      variables: {
      limit,
      offset: n,
      },
    });
    return res;
  };

  const limitRefetch = (customLimit: number) => {
    const res = refetch({
      bankAccountId: intId,
      limit: customLimit,
      offset: PAGE,
      filter,
    });
    console.log("RES", res);
    return res;
  };

  return (
    <Layout>
      <PageHeader
        accountLoading={loading}
        type={data?.bankAccount?.type}
        name={data?.bankAccount?.name}
        heading="Transactions"
      />
      <AddAccountButton />
      <AccountStats
        balance={data?.bankAccount?.currentBalance}
        spending={data?.bankAccount?.monthlySpending}
        deposits={data?.bankAccount?.monthlyDeposits}
        transactions={data?.bankAccount?.monthlyTransactions}
        loading={loading}
      />
      <AddTransaction />
      <TransactionsWrapper>
        <TransactionsTableFilters
          setPage={setPage}
          filter={filter}
          loading={TotalLoading}
          count={TotalCount?.totalTransactions}
          setFilter={setFilter}
        />
        <TransactionsTableEntries
          limit={limit}
          setLimit={setLimit}
          count={TotalCount?.totalTransactions}
          limitRefetch={limitRefetch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <TransactionsList
          count={TotalCount?.totalTransactions}
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
