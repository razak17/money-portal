import {
  Flex,
  Button,
  Link as ChakraLink,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { Link, useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { NonAuthRoutes } from "../../api/routes";

interface NavProps {
  hidden?: boolean;
}

export const Nav: React.FC<NavProps> = ({ hidden = true }) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const { data, loading } = useMeQuery();

  const history = useHistory();
  const apolloClient = useApolloClient();

  let status = null;

  if (loading || logoutFetching) {
    return (
      <Box>
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (data?.me) {
    status = (
      <Button
        isLoading={logoutFetching}
        onClick={async () => {
          await logout();
          await apolloClient.clearStore();
          history.push(NonAuthRoutes.LOGIN);
        }}
      >
        Logout
      </Button>
    );
  } else {
    status = (
      <Flex flexWrap="wrap">
        <Button
          isLoading={loading}
          onClick={() => {
            history.push(NonAuthRoutes.LOGIN);
          }}
        >
          Login
        </Button>
        <Button
          ml={4}
          isLoading={loading}
          onClick={() => {
            history.push(NonAuthRoutes.REGISTER);
          }}
        >
          Register
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      display={{ base: "block", lg: hidden ? "none" : "block" }}
      zIndex={1}
      position="sticky"
      top={0}
      bg="tan"
      p={4}
    >
      <Flex flex={1} m="auto" align="center" maxW="80%">
        <ChakraLink as={Link} to="/">
          <Flex flexWrap="wrap" letterSpacing="0.1em" textTransform="uppercase">
            <Heading size="md">Money|</Heading>
            <Heading color="teal.600" size="md">
              Portal
            </Heading>
          </Flex>
        </ChakraLink>
        <Box ml={"auto"}>{status}</Box>
      </Flex>
    </Flex>
  );
};
