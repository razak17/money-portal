import { useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import {
  Footer,
  Layout,
  PageHeader,
  EditDeleteAccountButton,
  MainContent,
  AccountStats,
  AddTransaction,
  CreateAccountModal,
  SideBar,
  TransactionsList,
  DeleteAccountModal,
  EditAccountModal,
} from "../components";
import { useGetAccountFromUrl } from "../utils/useGetAccountFromUrl";
import { useGetIntId } from "../utils/useGetIntId";

interface TransactionsProps {}

export const Transactions: React.FC<TransactionsProps> = () => {
  const {
    isOpen: isOpenAccount,
    onOpen: onOpenAccount,
    onClose: onCloseAccount,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const { data, loading } = useGetAccountFromUrl();
  const intId = useGetIntId();
  console.log(intId);
  // console.log(data);

  return (
    <Layout>
      <SideBar onOpen={onOpenAccount} />
      <MainContent>
        <PageHeader heading="Transactions" />
        <CreateAccountModal isOpen={isOpenAccount} onClose={onCloseAccount} />
        <EditAccountModal isOpen={isOpenEdit} onClose={onCloseEdit} />
        <DeleteAccountModal isOpen={isOpenDelete} onClose={onCloseDelete} />
        <EditDeleteAccountButton
          onOpenEdit={onOpenEdit}
          onOpenDelete={onOpenDelete}
        />
        <AccountStats
          balance={data?.bankAccount?.currentBalance}
          spending={data?.bankAccount?.monthlySpending}
          deposits={data?.bankAccount?.monthlyDeposits}
          transactions={data?.bankAccount?.monthlyTransactions}
          loading={loading}
        />
        <AddTransaction />
        <TransactionsList />
        <Footer />
      </MainContent>
    </Layout>
  );
};
