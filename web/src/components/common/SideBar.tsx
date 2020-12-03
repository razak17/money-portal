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

interface SideBarProps {
  onOpen: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({ onOpen }) => {
  const [isOpenSideBar, setIsOpenSideBar] = React.useState(false);

  const toggling = () => setIsOpenSideBar(!isOpenSideBar);

  React.useEffect(() => {
    console.log("hey!");
  });

  const { data: MeData, loading: MeLoading } = useMeQuery();
  const { data, loading, variables, fetchMore } = useBankAccountsQuery({
    variables: {
      limit: 4,
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
          <Heading size="xl">Hello, {toTitleCase(MeData.me.username)}</Heading>
        </Flex>
      ) : !MeLoading && !MeData ? (
        <Flex padding="2rem" alignItems="center">
          <Heading size="xl">Demo Personal</Heading>
        </Flex>
      ) : null}
    </>
  );

  const addBankAccount = (
    <ChakraLink
      display="block"
      position="relative"
      padding="1.5rem 2rem"
      onClick={onOpen}
    >
      <Text>Add Bank Account</Text>
    </ChakraLink>
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
        <List mt={0} borderBottom="1px solid black" maxHeight="none">
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
        <List mt={0} borderBottom="1px solid black" maxHeight="none">
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
                  <Text>{b.name}</Text>
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
      {addBankAccount}
    </>
  );

  return (
    <Box>
      <Box width="280px" height="100%" borderRight="1px solid black">
        <Box position="relative" borderBottom="1px solid black" mb="1rem">
          {heading}
        </Box>
        <Box mb="1rem" ml="2rem">
          <Heading size="md">Personal</Heading>
        </Box>
        <List maxHeight="none" mt={0} mb="1rem">
          <ListItem
            fontSize={12}
            position="relative"
            borderBottom="1px solid black"
          >
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
    </Box>
  );
};
