import * as React from "react";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import { toTitleCase } from "../../utils/toTitleCase";
import { useMeQuery } from "../../generated/graphql";

interface HeaderProps {
  text: string;
}

export const Header: React.FC<HeaderProps> = ({ text }) => {
  const { data, loading } = useMeQuery();

  const h = (
    <Box position="relative" borderBottom="1px solid black" mb="1rem">
      {loading ? (
        <Flex padding="2rem" alignItems="center">
          <Text fontSize="md">Loading...</Text>
        </Flex>
      ) : data?.me && data?.me.username ? (
        <Flex padding="2rem" alignItems="center">
          <Heading size="md">Hello, {toTitleCase(data?.me.username)}</Heading>
        </Flex>
      ) : !data?.me?.username ? (
        <Flex padding="2rem" alignItems="center">
          <Heading size="md">Demo Personal</Heading>
        </Flex>
      ) : null}
    </Box>
  );

  return (
    <Box mb="1em" mt="1em" ml="2em">
      <Heading size="md">{text}</Heading>
    </Box>
  );
};
