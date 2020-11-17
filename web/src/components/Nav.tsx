import React from "react";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

interface Props {}

export const Nav: React.FC<Props> = () => {
  return (
    <Flex zIndex={1} top={0} bg="tan" p={7}>
      <Flex flex={1} m="auto" align="center">
        <NavLink to="/">
          <Heading>Money Portal</Heading>
        </NavLink>
        <Box ml="auto">
          <NavLink to="/login">
            <Text fontSize="xl" mr={2}>
              logout
            </Text>
          </NavLink>
        </Box>
      </Flex>
    </Flex>
  );
};
