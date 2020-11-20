import { Flex, Box, Text } from "@chakra-ui/react";
import React from "react";

interface PageHeaderProps {}

export const PageHeader: React.FC<PageHeaderProps> = () => {
  return (
    <Flex
      top={0}
      borderTop="1px solid black"
      borderBottom="1px solid black"
      mb={10}
      p={6}
    >
      <Flex flex={1} m="auto" align="center">
        <Box mr="auto">
          <Text mr={2}>Home</Text>
        </Box>
      </Flex>
    </Flex>
  );
};
