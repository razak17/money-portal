import {
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { Link } from "react-router-dom";
import { useBankAccountsQuery, useMeQuery } from "../../generated/graphql";
import { toTitleCase } from "../../utils/toTitleCase";
import { LIMIT } from "../../constants";

interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = () => {
  const [isOpenSideBar, setIsOpenSideBar] = React.useState(false);

  const toggling = () => setIsOpenSideBar(!isOpenSideBar);

  const { data: MeData, loading: MeLoading } = useMeQuery();
  const { data, loading, variables, fetchMore } = useBankAccountsQuery({
    variables: {
      limit: LIMIT,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  // console.log(data?.bankAccounts);

  const home = (
    <ChakraLink
      as={Link}
      to="/dashboard/lobby"
      display="block"
      position="relative"
      padding="1.5rem 2rem"
    >
      <Text>Home</Text>
    </ChakraLink>
  );

  const heading = (
    <>
      {MeLoading ? (
        <Flex padding="2rem" alignItems="center">
          <Text fontSize="md">Loading...</Text>
        </Flex>
      ) : MeData && MeData?.me?.username ? (
        <Flex padding="2rem" alignItems="center">
          <Heading size="md">Hello, {toTitleCase(MeData.me.username)}</Heading>
        </Flex>
      ) : !MeLoading && !MeData ? (
        <Flex padding="2rem" alignItems="center">
          <Heading size="md">Demo Personal</Heading>
        </Flex>
      ) : null}
    </>
  );

  const accountsButton = (
    <ChakraLink
      display="block"
      position="relative"
      padding="1.5rem 2rem"
      onClick={toggling}
    >
      <Flex flex={1} flexWrap="nowrap">
        <Text>Bank Accounts</Text>
        <Box ml="auto">
          <Text>&#60;</Text>
        </Box>
      </Flex>
    </ChakraLink>
  );

  const accountsLoading = (
    <Box textAlign="center" p="1.5rem">
      <Text fontSize="lg">loading...</Text>
    </Box>
  );

  const bankAccounts = (
    <>
      {loading ? accountsLoading : accountsButton}
      {isOpenSideBar && loading ? (
        accountsLoading
      ) : isOpenSideBar && data?.bankAccounts.bankAccounts.length === 0 ? (
        <List mt={0} maxHeight="none">
          <ListItem fontSize={12} position="relative">
            <Box
              display="block"
              position="relative"
              padding="1.5rem 2rem"
              paddingLeft="4rem"
            >
              <Text>No Bank Accounts yet.</Text>
            </Box>
          </ListItem>
        </List>
      ) : isOpenSideBar && data?.bankAccounts ? (
        <List mt={0} maxHeight="none">
          {data?.bankAccounts &&
            data?.bankAccounts.bankAccounts.map((b) => (
              <ListItem fontSize={12} key={b.id} position="relative">
                <ChakraLink
                  as={Link}
                  to={`/dashboard/accounts/accounts-details/${b.id}`}
                  display="block"
                  position="relative"
                  padding="1.5rem 2rem"
                  paddingLeft="4rem"
                >
                  <Text>{toTitleCase(b.name)}</Text>
                </ChakraLink>
              </ListItem>
            ))}
          {data?.bankAccounts && data.bankAccounts.hasMore ? (
            <ListItem position="relative">
              <ChakraLink
                display="block"
                position="relative"
                padding="1.5rem 2rem"
                paddingLeft="4rem"
                onClick={() => {
                  fetchMore({
                    variables: {
                      limit: variables?.limit,
                      cursor:
                        data?.bankAccounts.bankAccounts[
                          data.bankAccounts.bankAccounts.length - 1
                        ].createdAt,
                    },
                  });
                }}
              >
                <Text>Load More</Text>
              </ChakraLink>
            </ListItem>
          ) : null}
        </List>
      ) : null}
    </>
  );

  return (
    <Box
      position="sticky"
      borderRight="1px solid black"
      top={0}
      bottom={0}
      left={0}
      zIndex={1}
      height="100vh"
      maxH="100%"
      overflowY="auto"
      width={{ base: "0", sm: "0", md: "0", lg: "260px" }}
      overflowWrap="break-word"
      flexShrink={0}
    >
      <Box position="relative" borderBottom="1px solid black">
        <ChakraLink as={Link} to="/">
          <Flex
            p="2rem"
            flexWrap="wrap"
            letterSpacing="0.1em"
            textTransform="uppercase"
          >
            <Heading size="lg">Money|</Heading>
            <Heading size="lg">Portal</Heading>
          </Flex>
        </ChakraLink>
      </Box>

      <Box position="relative" borderBottom="1px solid black" mb="1rem">
        {heading}
      </Box>
      <Box mb="1rem" ml="2rem">
        <Heading size="md">Personal</Heading>
      </Box>
      <List maxHeight="none" mt={0} mb="1rem">
        <ListItem fontSize={12} position="relative">
          {home}
        </ListItem>
        <ListItem
          fontSize={12}
          position="relative"
          borderBottom="1px solid black"
        >
          {bankAccounts}
        </ListItem>
      </List>
    </Box>
  );
};
