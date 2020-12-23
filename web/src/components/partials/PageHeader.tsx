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
  bg: string;
  borderBg: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  type,
  name,
  heading,
  accountLoading = false,
  bg,
  borderBg
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

  const header = (
    <Box mr="auto">
      {accountLoading ? (
        <Heading padding="0.5rem" size="sm">...</Heading>
      ) : type && name ? (
          <Flex
            flexWrap="wrap"
          >
            <Heading
              padding="0.5rem 0"
              size="sm"
            >
              {toTitleCase(name)}
            </Heading>
            <Heading
              ml={2}
              padding="0.5rem 0"
              size="sm"
            >
              -
            </Heading>
            <Heading
              size="sm"
              ml={2}
              padding="0.5rem 0"
            >
              {" " + toTitleCase(type)}
            </Heading>
          </Flex>
      ) : (
        <Heading padding="0.5rem" size="sm">{heading}</Heading>
      )}
    </Box>
  )

  return (
    <Flex
      bg={bg}
      mb="1rem"
      borderBottom={borderBg}
      padding="0.5em 1.5em"
    >
      {header}
        <Heading padding="0.5rem" size="sm">
          {MeLoading ? (
            <>...</>
          ) : data?.me ? (
            <>Hi, {data.me.username}</>
          ) : (
            <>Hi, user</>
          )}
        </Heading>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Box ml={4}>{menu}</Box>
    </Flex>
  );
};

