import { Flex, Link as ChakraLink, Heading, Text, Box } from "@chakra-ui/react";
import React from "react";

interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
  return (
    <Flex padding="1.5rem 2rem" borderBottom="1px solid black">
      <Flex
        flex={1}
        flexWrap="nowrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <ChakraLink>
          <Flex
            flexWrap="wrap"
            letterSpacing="0.1em"
            textTransform="uppercase"
            size="md"
          >
            <Heading size="md">Money</Heading>
            <Heading size="md">Portal</Heading>
          </Flex>
        </ChakraLink>
      </Flex>
      <Box ml="auto">
        <ChakraLink>
          <Text fontSize="xl">Logout</Text>
        </ChakraLink>
      </Box>
    </Flex>
  );
};
