import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Link as ChakraLink,
  Box,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useLogoutMutation } from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

interface PageHeaderProps {
  heading: string;
  onOpen: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ heading, onOpen }) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const history = useHistory();

  const popover = (
    <Popover size="15rem" placement="bottom-end" isLazy>
      <PopoverTrigger>
        <Button>Click me</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Box mt={2} ml="auto">
            <ChakraLink onClick={onOpen}>Add Account</ChakraLink>
          </Box>
          <Box mt={2}>
            <ChakraLink onClick={onOpen}>My Profile</ChakraLink>
          </Box>
          <Box mt={2}>
            <ChakraLink onClick={onOpen}>Settings</ChakraLink>
          </Box>
          <Flex flex={1} mt={2}>
            <Button
              ml="auto"
              isLoading={logoutFetching}
              onClick={async () => {
                await logout();
                await apolloClient.clearStore();
                history.push("/login");
              }}
            >
              Logout
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );

  return (
    <Flex mb="1rem" padding="0.5rem 1.5rem" borderBottom="1px solid black">
      <Box m="auto" width="100%">
        <Heading size="md">{heading}</Heading>
      </Box>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Box ml={4}>{popover}</Box>
    </Flex>
  );
};
