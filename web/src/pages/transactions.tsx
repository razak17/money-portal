import * as React from "react";
import {
  Layout,
  AccountStats,
  AddAccountButton,
  TransactionsList,
} from "../components";
import { Footer, PageHeader } from "../components/partials";
import { AddTransaction } from "../components/transactions";
import { useGetAccountFromUrl } from "../utils/useGetAccountFromUrl";
import { useGetIntId } from "../utils/useGetIntId";
import { EditDeleteAccountButton } from "../components/EditDeleteAcountButton";

interface TransactionsProps {}

export const Transactions: React.FC<TransactionsProps> = () => {
  const { data, loading } = useGetAccountFromUrl();
  const intId = useGetIntId();
  console.log("intId", intId);

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
      <TransactionsList />
      <Footer />
    </Layout>
  );
};
