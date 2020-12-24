import { useDisclosure, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { Layout, LobbyOptions, CreateAccountModal } from "../../components";
import { PageHeader } from "../../components/partials";
import { withApollo, useIsAuth } from '../../utils';
import { BORDER_BG_LIGHT, BORDER_BG_DARK } from '../../constants';

interface LobbyProps {}

const Lobby: React.FC<LobbyProps> = () => {
  useIsAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const altBg = useColorModeValue("gray.50", "brandDark.700")
  const borderBg = useColorModeValue(BORDER_BG_LIGHT, BORDER_BG_DARK);

  return (
    <Layout>
      <PageHeader bg={altBg} borderBg={borderBg} heading="Lobby" />
      <CreateAccountModal isOpen={isOpen} onClose={onClose} />
      <LobbyOptions onOpen={onOpen} />
    </Layout>
  );
};

export default withApollo({ ssr: true })(Lobby);

