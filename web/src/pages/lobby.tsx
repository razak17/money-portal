import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  AddAccountModal,
  Layout,
  Footer,
  PageHeader,
  LobbyOptions,
  MainContent,
  SideBar,
} from "../components";

interface LobbyProps {}

export const Lobby: React.FC<LobbyProps> = () => {
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
        <PageHeader heading="Lobby" />
        <AddAccountModal isOpen={isOpen} onClose={onClose} />
        <LobbyOptions onOpen={onOpen} />
        <Footer />
      </MainContent>
    </Layout>
  );
};
