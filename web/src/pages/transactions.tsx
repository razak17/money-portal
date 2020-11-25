import { useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import {
  Footer,
  Layout,
  PageHeader,
  EditSelectButton,
  MainContent,
  AccountStats,
  AddTransaction,
  CreateAccountModal,
  SideBar,
  TransactionsList,
} from "../components";
import { useGetransactionFromUrl } from "../utils/useGetTransactionFromUrl.ts ";

interface TransactionsProps {}

const statOptions = [
  { id: "1", name: "Current Balalnce", value: "$272,00.48" },
  { id: "2", name: "Monthly Spending", value: "$22,00.48" },
  { id: "3", name: "Monthly Deposits", value: "$17,00.48" },
  { id: "4", name: "Monthly Transactions", value: "22" },
];

export const Transactions: React.FC<TransactionsProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useGetransactionFromUrl();
  console.log(data);

  return (
    <Layout>
      <SideBar onOpen={onOpen} />
      <MainContent>
        <PageHeader heading="Transactions" />
        <CreateAccountModal isOpen={isOpen} onClose={onClose} />
        <EditSelectButton />
        <AccountStats statOptions={statOptions} />
        <AddTransaction />
        <TransactionsList />
        <Footer />
      </MainContent>
    </Layout>
  );
};
