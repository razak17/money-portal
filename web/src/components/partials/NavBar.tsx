import {
  Flex,
  Button,
  Link as ChakraLink,
  Heading,
  VisuallyHidden,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { NonAuthRoutes } from "../../api/routes";
import { useRouter } from "next/router";
import NextLink from "next/link";

interface NavProps {
  hidden?: boolean;
}

export const NavBar: React.FC<NavProps> = ({ hidden = true }) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const { data, loading } = useMeQuery();
  const router = useRouter();

  const apolloClient = useApolloClient();

  let status = null;

  if (loading || logoutFetching) {
    return (
      <Box>
        <VisuallyHidden>This will be hidden</VisuallyHidden>
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
          router.push(NonAuthRoutes.LOGIN);
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
            router.push(NonAuthRoutes.LOGIN);
          }}
        >
          Login
        </Button>
        <Button
          ml={4}
          isLoading={loading}
          onClick={() => {
            router.push(NonAuthRoutes.REGISTER);
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
        <NextLink href='/'>
          <ChakraLink>
            <Flex flexWrap="wrap" letterSpacing="0.1em" textTransform="uppercase">
              <Heading size="md">Money|</Heading>
              <Heading color="teal.600" size="md">
                Portal
              </Heading>
            </Flex>
          </ChakraLink>
        </NextLink>
        <Box ml={"auto"}>{status}</Box>
      </Flex>
    </Flex>
  );
};

