import {
  Flex,
  Button,
  Link as ChakraLink,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useLogoutMutation } from "../../generated/graphql";
import { useHistory, Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const history = useHistory();
  const apolloClient = useApolloClient();

  return (
    <Flex padding="1.5rem 2rem" borderBottom="1px solid black">
      <Flex
        flex={1}
        flexWrap="nowrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <ChakraLink as={Link} to="/">
          <Flex flexWrap="wrap" letterSpacing="0.1em" textTransform="uppercase">
            <Heading size="md">Money|</Heading>
            <Heading size="md">Portal</Heading>
          </Flex>
        </ChakraLink>
      </Flex>
      <Box ml="auto">
        <Button
          isLoading={logoutFetching}
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
            history.push("/login");
          }}
        >
          Logout
        </Button>
      </Box>
    </Flex>
  );
};
