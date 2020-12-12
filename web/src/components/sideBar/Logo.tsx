import * as React from "react";
import { Box, Heading, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {}

export const Logo: React.FC<Props> = () => {
  return (
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
  );
};
