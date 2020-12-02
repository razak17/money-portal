import React from "react";
import { Box, Heading, Flex, Text } from "@chakra-ui/react";

interface StatStackProps {
  title: string;
  value: number | undefined;
  loading: boolean;
  withSign?: boolean;
}

export const StatStack: React.FC<StatStackProps> = ({
  title,
  value,
  loading,
  withSign = false,
}) => {
  return (
    <Box
      p={4}
      maxWidth="25%"
      shadow="md"
      borderWidth="1px"
      flex="1"
      borderRadius="md"
    >
      <Flex justifyContent="center" mb={2} textTransform="uppercase">
        <Heading size="xs">{title}</Heading>
      </Flex>
      <Flex justifyContent="center">
        {loading ? (
          <Box textAlign="center">
            <Text fontSize="md">loading...</Text>
          </Box>
        ) : (
          <Text fontSize="3xl">{withSign ? `$${value}` : value}</Text>
        )}
      </Flex>
    </Box>
  );
};
