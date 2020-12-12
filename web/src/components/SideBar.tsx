import { Link as ChakraLink, List, ListItem, Text } from "@chakra-ui/react";
import * as React from "react";
import { Link } from "react-router-dom";
import { BankAccounts, Header, Wrapper, Logo } from "./sideBar";

interface SideBarProps {
  showModal: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({ showModal }) => {
  // const [open, setOpen] = React.useState(false);
  // const toggle = () => setOpen(!open);

  const home = (
    <ListItem fontSize={12} position="relative">
      <ChakraLink
        as={Link}
        to="/dashboard/lobby"
        display="block"
        position="relative"
        padding="1.5rem 2rem"
      >
        <Text>Home</Text>
      </ChakraLink>
    </ListItem>
  );

  return (
    <Wrapper>
      <Logo />
      <Header text="Personal" />
      <List maxHeight="none" mt={0} mb="2em">
        {home}
        <BankAccounts />
      </List>
      <Header text="Account" />
      <List maxHeight="none" mt={0} mb="1rem">
        <ListItem fontSize={12} position="relative">
          <ChakraLink
            onClick={showModal}
            display="block"
            position="relative"
            padding="1.5rem 2rem"
          >
            <Text>Create Account</Text>
          </ChakraLink>
        </ListItem>
      </List>
    </Wrapper>
  );
};
