import * as React from "react";
import {
  Layout,
  AccountStats,
  AddAccountButton,
} from "../components";
import { Footer, PageHeader } from "../components/partials";
import { AddTransaction } from "../components/transactions";
import { useGetAccountFromUrl } from "../utils/useGetAccountFromUrl";
import { useGetIntId } from "../utils/useGetIntId";
import { EditDeleteAccountButton } from "../components/EditDeleteAcountButton";
import {
  useTotalTransactionsQuery,
  useTransactionsQuery,
} from '../generated/graphql';
import { LIMIT, PAGE, ALL } from '../constants';
import { TransactionsWrapper, TransactionItem, TransactionsTableFilters, TransactionsTableEntries, TransactionsTable, TransactionsPagination } from '../components/transactions';
import { LoadingSpinner } from '../components/partials';

interface TransactionsProps {}

export const Transactions: React.FC<TransactionsProps> = () => {
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


  const moreData = (n: number) => {
    const res = fetchMore({
      variables: {
      limit,
      offset: n,
      },
    });
    return res;
  };

  const filterRefetch = (customFilter: string) => {
    const res = refetch({
      bankAccountId: intId,
      limit,
      offset: PAGE,
      filter: customFilter,
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

  const searchRefetch = (query: string) => {
    const res = refetch({
      bankAccountId: intId,
      limit,
      offset: PAGE,
      filter,
      search: query
    });
    console.log("SEARCH", res);
    return res;
  };

  return (
    <Layout>
      <PageHeader
        loading={loading}
        type={data?.bankAccount?.type}
        name={data?.bankAccount?.name}
        heading="Transactions"
      />
      <AddAccountButton />
      <EditDeleteAccountButton />
      <AccountStats
        balance={data?.bankAccount ? data?.bankAccount?.currentBalance : 0}
        spending={data?.bankAccount ? data?.bankAccount?.monthlySpending : 0}
        deposits={data?.bankAccount ? data?.bankAccount?.monthlyDeposits : 0}
        transactions={
          data?.bankAccount ? data?.bankAccount?.monthlyTransactions : 0
        }
        loading={loading}
      />
      <AddTransaction />
      <TransactionsWrapper>
        <TransactionsTableFilters
          filter={filter}
          loading={TotalLoading}
          count={TotalCount?.totalTransactions}
          setFilter={setFilter}
          filterRefetch={filterRefetch}
        />
        <TransactionsTableEntries
          limit={limit}
          setLimit={setLimit}
          limitRefetch={limitRefetch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchRefetch={searchRefetch}
        />
      {TransactionLoading ? (
        <LoadingSpinner variant="small" />
      ) : TransactionData?.transactions.transactions ? (
        <>
        <TransactionsTable>
          {TransactionData?.transactions &&
            TransactionData?.transactions.transactions.map((t, index) =>
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
            count={TotalCount?.totalTransactions}
            moreData={moreData}
          />
          </>
      ) : null}

      </TransactionsWrapper>
      <Footer />
    </Layout>
  );
};
