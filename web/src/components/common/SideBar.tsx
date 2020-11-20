import {
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface SideBarProps {
  isOpen: any;
  toggling: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void | undefined;
}

const bankOptions = [
  {
    id: 1,
    value: "Personal",
  },
  {
    id: 2,
    value: "Checking",
  },
  {
    id: 3,
    value: "Savings",
  },
];

export const SideBar: React.FC<SideBarProps> = ({ toggling, isOpen }) => {
  const home = (
    <ChakraLink display="block" position="relative" padding="1.5rem 2rem">
      <Text>Home</Text>
    </ChakraLink>
  );

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
      {isOpen && (
        <List mt={0} maxHeight="none">
          {bankOptions.map((option) => (
            <ListItem fontSize={12} key={option.id} position="relative">
              <ChakraLink
                display="block"
                position="relative"
                padding="1.5rem 2rem"
                paddingLeft="4rem"
              >
                <Text>{option.value}</Text>
              </ChakraLink>
            </ListItem>
          ))}
          <ListItem position="relative">
            <ChakraLink
              display="block"
              position="relative"
              padding="1.5rem 2rem"
              paddingLeft="4rem"
            >
              <Text>Add New Bank Account</Text>
            </ChakraLink>
          </ListItem>
        </List>
      )}
    </>
  );

  return (
    <Box>
      <Box width="280px" height="100%" borderRight="1px solid black">
        {/* User Header */}
        <Box position="relative" borderBottom="1px solid black" mb="1rem">
          <ChakraLink>
            <Flex padding="2rem" alignItems="center">
              <Heading size="xl">Demo Personal</Heading>
            </Flex>
          </ChakraLink>
        </Box>
        {/* Current */}
        <Box mb="1rem" ml="2rem">
          <Heading size="md">Personal</Heading>
        </Box>
        {/* List Items */}
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
