import React, { useState } from "react";
import {
  SideBar,
  Footer,
  Layout,
  LobbyHeader,
  EditSelectButton,
  AccountStats,
  MainContent,
} from "../components";

interface TransactionsProps {}

export const Transactions: React.FC<TransactionsProps> = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  const toggling = () => setIsOpenSideBar(!isOpenSideBar);

  return (
    <Layout>
      <SideBar toggling={toggling} isOpen={isOpenSideBar} />
      <MainContent>
        <LobbyHeader heading="Transactions" />
        <EditSelectButton />
        <AccountStats />
        <Footer />
      </MainContent>
    </Layout>
  );
};
