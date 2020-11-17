import React from "react";
import {
  Link as ChakraLink,
  List,
  ListItem,
  GridItem,
  Box,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
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

export const SideBar: React.FC<Props> = ({ toggling, isOpen }) => {
  return (
    <GridItem rowSpan={3}>
      <Box
        height="100%"
        overflowY="scroll"
        borderRight="1px solid black"
        alignItems="left"
      >
        <Box padding="18px 20px">
          <Text fontSize={15}>Personal Account</Text>
        </Box>
        <Box>
          <List spacing={1}>
            <ListItem fontSize={12} position="relative">
              <ChakraLink
                display="block"
                position="relative"
                padding="15px 20px"
              >
                <Text>Home</Text>
              </ChakraLink>
            </ListItem>
            <ListItem fontSize={12} position="relative">
              <ChakraLink
                display="block"
                position="relative"
                padding="15px 20px"
                onClick={toggling}
              >
                <Text>Bank Accounts</Text>
              </ChakraLink>
              {isOpen && (
                <List marginLeft={10}>
                  {bankOptions.map((option) => (
                    <ListItem
                      fontSize={12}
                      key={option.id}
                      position="relative"
                      color="green"
                    >
                      <ChakraLink
                        display="block"
                        position="relative"
                        padding="15px 20px"
                      >
                        <Text>{option.value}</Text>
                      </ChakraLink>
                    </ListItem>
                  ))}
                  <ListItem fontSize={12} position="relative">
                    <ChakraLink
                      display="block"
                      position="relative"
                      padding="15px 20px"
                    >
                      <Text>Add New Bank Account</Text>
                    </ChakraLink>
                  </ListItem>
                </List>
              )}
            </ListItem>
          </List>
        </Box>
      </Box>
    </GridItem>
  );
};
