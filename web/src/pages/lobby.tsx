import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  AddAccountModal,
  SideBar,
  Layout,
  Footer,
  LobbyHeader,
  LobbyOptions,
  MainContent,
} from "../components";

interface LobbyProps {}

export const Lobby: React.FC<LobbyProps> = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggling = () => setIsOpenSideBar(!isOpenSideBar);

  return (
    <Layout>
      <SideBar toggling={toggling} isOpen={isOpenSideBar} />
      <MainContent>
        <LobbyHeader heading="Lobby" />
        <AddAccountModal isOpen={isOpen} onClose={onClose} />
        <LobbyOptions onOpen={onOpen} />
        <Footer />
      </MainContent>
    </Layout>
  );
};
