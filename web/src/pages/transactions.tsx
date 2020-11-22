import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Footer,
  Layout,
  PageHeader,
  EditSelectButton,
  MainContent,
  AccountStats,
  AddTransaction,
  AddAccountModal,
  SideBar,
  TransactionsList,
} from "../components";

interface TransactionsProps {}

const statOptions = [
  { id: "1", name: "Current Balalnce", value: "$272,00.48" },
  { id: "2", name: "Monthly Spending", value: "$22,00.48" },
  { id: "3", name: "Monthly Deposits", value: "$17,00.48" },
  { id: "4", name: "Monthly Transactions", value: "22" },
];

export const Transactions: React.FC<TransactionsProps> = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sidebarToggling = () => setIsOpenSideBar(!isOpenSideBar);

  return (
    <Layout>
      <SideBar
        onOpen={onOpen}
        toggling={sidebarToggling}
        isOpen={isOpenSideBar}
      />
      <MainContent>
        <PageHeader heading="Transactions" />
        <AddAccountModal isOpen={isOpen} onClose={onClose} />
        <EditSelectButton />
        <AccountStats statOptions={statOptions} />
        <AddTransaction />
        <TransactionsList />
        <Footer />
      </MainContent>
    </Layout>
  );
};
