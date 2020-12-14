import { Link as ChakraLink, List, ListItem, Text } from "@chakra-ui/react";
import * as React from "react";
import { Link } from "react-router-dom";
import { BankAccounts, Header, SideBarWrapper, Logo } from "./sideBar";
import { AuthRoutes } from "../api/routes";

interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = () => {
  const personal = (
    <List maxHeight="none" mt={0} mb="2em">
      <ListItem fontSize={12} position="relative">
        <ChakraLink
          as={Link}
          to={AuthRoutes.DASHBOARD}
          display="block"
          position="relative"
          padding="1.5rem 2rem"
        >
          <Text>Home</Text>
        </ChakraLink>
      </ListItem>
      <BankAccounts />
    </List>
  );

  const manage = (
    <List maxHeight="none" mt={0} mb="1rem">
      <ListItem fontSize={12} position="relative">
        <ChakraLink
          as={Link}
          to={AuthRoutes.PROFILE}
          display="block"
          position="relative"
          padding="1.5rem 2rem"
        >
          <Text>Account</Text>
        </ChakraLink>
      </ListItem>
      <ListItem fontSize={12} position="relative">
        <ChakraLink
          as={Link}
          to={AuthRoutes.SETTINGS}
          display="block"
          position="relative"
          padding="1.5rem 2rem"
        >
          <Text>Settings</Text>
        </ChakraLink>
      </ListItem>
    </List>
  );

  return (
    <SideBarWrapper>
      <Logo />
      <Header text="Personal Account" />
      {personal}
      <Header text="My Account" />
      {manage}
    </SideBarWrapper>
  );
};
