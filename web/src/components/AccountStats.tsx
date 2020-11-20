import { HStack, Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface AccountStatsProps {}

export const AccountStats: React.FC<AccountStatsProps> = () => {
  return (
    <HStack spacing={8} mb={9}>
      <Box
        padding="20px"
        maxWidth="25%"
        shadow="md"
        textAlign="left"
        flex={1}
        borderRadius="md"
      >
        <Box>
          <Heading size="md">Add Account</Heading>
        </Box>
        <Box>
          <Text mt={4}>desc</Text>
        </Box>
      </Box>
    </HStack>
  );
};
