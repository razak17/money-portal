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
  const { data, loading } = useBankAccountsQuery({
    variables: {
      limit: 10,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const { data: MeData, loading: MeLoading } = useMeQuery();

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

  let heading = null;
  if (MeLoading) {
    heading = (
      <Flex padding="2rem" alignItems="center">
        <Text fontSize="md">Loading...</Text>
      </Flex>
    );
  } else if (!MeData?.me?.username) {
    heading = (
      <Flex padding="2rem" alignItems="center">
        <Heading size="xl">Demo Personal</Heading>
      </Flex>
    );
  } else {
    heading = (
      <Flex padding="2rem" alignItems="center">
        <Heading size="xl">Hello, {toTitleCase(MeData.me.username)}</Heading>
      </Flex>
    );
  }

  const bankAccounts = (
    <>
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
      {isOpenSideBar && (
        <>
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
                    <Text>{b.name}</Text>
                  </ChakraLink>
                </ListItem>
              ))}
            <ListItem position="relative">
              <ChakraLink
                display="block"
                position="relative"
                padding="1.5rem 2rem"
                paddingLeft="4rem"
                onClick={onOpen}
              >
                <Text>Add Bank Account</Text>
              </ChakraLink>
            </ListItem>
          </List>
          {loading && (
            <Box textAlign="center" p="1.5rem">
              <Text fontSize="lg">loading...</Text>
            </Box>
          )}
          {data?.bankAccounts?.bankAccounts.length === 0 && (
            <Box textAlign="center" p="1.5rem">
              <Text fontSize="lg">No Bank Accounts yet.</Text>
            </Box>
          )}
        </>
      )}
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
