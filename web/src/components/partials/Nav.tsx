import {
  Flex,
  Button,
  Link as ChakraLink,
  Heading,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useLogoutMutation } from "../../generated/graphql";
import { Link } from "react-router-dom";

interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();

  let status = null;

  status = (
    <Button
      isLoading={logoutFetching}
      onClick={async () => {
        await logout({
          update: (cache) => {
            cache.evict({ fieldName: "transactions:{}" });
            cache.gc();
          },
        });
        setTimeout(() => {}, 2000);
        window.location.reload();
        // history.push("/login");
      }}
    >
      Logout
    </Button>
  );

  return (
    <Flex
      display={{ base: "block", lg: "none" }}
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
          </Flex>
        </ChakraLink>
        <Box ml={"auto"}>{status}</Box>
      </Flex>
    </Flex>
  );
};
