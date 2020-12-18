import {
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import * as React from "react";
import { useMeQuery, useLogoutMutation } from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { ColorModeSwitcher } from "../";
import { AuthRoutes, NonAuthRoutes } from "../../api/routes";
import { toTitleCase } from "../../utils/toTitleCase";
import { useRouter } from "next/router";

interface PageHeaderProps {
  heading: string;
  type?: string | undefined;
  name?: string | undefined;
  accountLoading?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  type,
  name,
  heading,
  accountLoading = false,
}) => {
  const [logout] = useLogoutMutation();
  const { data, loading: MeLoading } = useMeQuery();
  const apolloClient = useApolloClient();
  const router = useRouter();

  const menu = (
    <Menu closeOnSelect={false} isLazy>
      <MenuButton
        width="2em"
        height="2em"
        cursor="pointer"
        as={Avatar}
        src=""
      />
      <MenuList minWidth="140px">
        <MenuGroup title="Profile">
          <MenuItem
            onClick={() => {
              router.push(AuthRoutes.PROFILE);
            }}
          >
            My Account
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push(AuthRoutes.SETTINGS);
            }}
          >
            Settings
          </MenuItem>
          <MenuItem
            onClick={async () => {
              await logout();
              await apolloClient.clearStore();
              router.push(NonAuthRoutes.LOGIN);
            }}
          >
            Logout
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem
            onClick={() => {
              router.push(NonAuthRoutes.FAQS);
            }}
          >
            FAQ
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );

  return (
    <Flex mb="1rem" padding="0.5em 1.5em" borderBottom="1px solid black">
      <Box mr="auto">
        {accountLoading ? (
          <Heading padding="0.5rem" size="md">...</Heading>
        ) : type && name ? (
            <Flex
              flexWrap="wrap"
            >
              <Heading
                padding="0.5rem 0"
                color="yellow.200"
                size="md"
              >
                {toTitleCase(name)}
              </Heading>
              <Heading
                ml={2}
                padding="0.5rem 0"
                color="red.600"
                size="md"
              >
                -
              </Heading>
              <Heading
                size="md"
                ml={2}
                padding="0.5rem 0"
                color="teal.700"
              >
                {" " + toTitleCase(type)}
              </Heading>
            </Flex>
        ) : (
          <Heading padding="0.5rem" size="md">{heading}</Heading>
        )}
      </Box>
      {MeLoading ? (
        <Heading padding="0.5rem" size="md">...</Heading>
      ) :  data?.me ? (
        <Heading padding="0.5rem" size="md">Hi, {data.me.username}</Heading>
      ) : (
        <Heading padding="0.5rem" size="md">Hi, user</Heading>
      )}
      <ColorModeSwitcher justifySelf="flex-end" />
      <Box ml={4}>{menu}</Box>
    </Flex>
  );
};

