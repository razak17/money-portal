import { HStack, Box, Heading, Flex, Text } from "@chakra-ui/react";
import React from "react";

type statType = {
  id: string;
  name: string;
  value: string;
};

interface AccountStatsProps {
  statOptions: statType[];
}

export const AccountStats: React.FC<AccountStatsProps> = ({ statOptions }) => {
  return (
    <Box padding="0 2rem" marginBottom="2rem">
      <HStack spacing={8}>
        {statOptions.map((option) => (
          <Box
            key={option.id}
            p={4}
            maxWidth="25%"
            shadow="md"
            borderWidth="1px"
            flex="1"
            borderRadius="md"
          >
            <Flex justifyContent="center" mb={2} textTransform="uppercase">
              <Heading size="xs">{option.name}</Heading>
            </Flex>
            <Flex justifyContent="center">
              <Text fontSize="3xl">{option.value}</Text>
            </Flex>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};
