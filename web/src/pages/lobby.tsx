import { useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import {
  Layout,
  Footer,
  PageHeader,
  LobbyOptions,
  MainContent,
  SideBar,
  CreateAccountModal,
} from "../components";

interface LobbyProps {}

export const Lobby: React.FC<LobbyProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      <SideBar onOpen={onOpen} />
      <MainContent>
        <PageHeader heading="Lobby" />
        <CreateAccountModal isOpen={isOpen} onClose={onClose} />
        <LobbyOptions onOpen={onOpen} />
        <Footer />
      </MainContent>
    </Layout>
  );
};
