import {
  Flex,
  Button,
  Link as ChakraLink,
  Heading,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { useHistory, Link } from "react-router-dom";

interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const history = useHistory();

  let status = null;

  status = (
    <Button
      isLoading={logoutFetching}
      onClick={async () => {
        await logout();
        history.push("/login");
      }}
    >
      Logout
    </Button>
  );

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
      <Box ml="auto">{status}</Box>
    </Flex>
  );
};
