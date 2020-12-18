import { useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { Layout, LobbyOptions, CreateAccountModal } from "../components";
import { Footer, PageHeader } from "../components/partials";

interface LobbyProps {}

export const Lobby: React.FC<LobbyProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      <PageHeader heading="Lobby" />
      <CreateAccountModal isOpen={isOpen} onClose={onClose} />
      <LobbyOptions onOpen={onOpen} />
      <Footer />
    </Layout>
  );
};
