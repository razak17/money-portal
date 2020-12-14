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
import React from "react";
import { useLogoutMutation } from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { AuthRoutes, NonAuthRoutes } from "../../api/routes";
import { toTitleCase } from "../../utils/toTitleCase";

interface PageHeaderProps {
  heading: string;
  type?: string | undefined;
  name?: string | undefined;
  loading?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  type,
  name,
  heading,
  loading = false,
}) => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const history = useHistory();

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
              history.push(AuthRoutes.PROFILE);
            }}
          >
            My Account
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push(AuthRoutes.SETTINGS);
            }}
          >
            Settings
          </MenuItem>
          <MenuItem
            onClick={async () => {
              await logout();
              await apolloClient.clearStore();
              history.push(NonAuthRoutes.LOGIN);
            }}
          >
            Logout
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem
            onClick={() => {
              history.push(NonAuthRoutes.FAQS);
            }}
          >
            FAQ
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );

  return (
    <Flex mb="1rem" padding="0.5rem 1.5rem" borderBottom="1px solid black">
      <Box mr="auto">
        {loading ? null : type && name ? (
          <Heading size="md">{`${toTitleCase(name)} - ${toTitleCase(
            type
          )}`}</Heading>
        ) : (
          <Heading size="md">{heading}</Heading>
        )}
      </Box>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Box ml={4}>{menu}</Box>
    </Flex>
  );
};
