import { useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { Layout, LobbyOptions, CreateAccountModal } from "../../components";
import { PageHeader } from "../../components/partials";
import { withApollo, useIsAuth } from '../../utils';

interface LobbyProps {}

const Lobby: React.FC<LobbyProps> = () => {
  useIsAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      <PageHeader heading="Lobby" />
      <CreateAccountModal isOpen={isOpen} onClose={onClose} />
      <LobbyOptions onOpen={onOpen} />
    </Layout>
  );
};

export default withApollo({ ssr: true })(Lobby);

