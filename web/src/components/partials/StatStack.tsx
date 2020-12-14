import React from "react";
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { LoadingSpinner } from "./";

interface StatStackProps {
  title: string;
  value: string | undefined;
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
      flex="0 0 auto"
      p={2}
      w={{ base: "100%", sm: "100%", md: "50%", xl: "25%" }}
    >
      <Flex
        height="100px"
        position="relative"
        borderWidth="1px"
        borderRadius="md"
        shadow="xs"
      >
        <Box flex="1 1 auto" p="0.5em 1em">
          <Flex
            justifyContent="center"
            alignItems="center"
            mb={2}
            textTransform="uppercase"
          >
            <Box p={4}>
              <Heading textAlign="center" size="xs">
                {title}
              </Heading>
            </Box>
          </Flex>
          <Flex justifyContent="center">
            {loading ? (
              <LoadingSpinner variant="small" />
            ) : (
              <Text fontSize="3xl">{withSign ? `$${value}` : value}</Text>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
