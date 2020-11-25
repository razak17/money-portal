import { Box, Flex } from "@chakra-ui/react";
import * as React from "react";
import { Nav } from "./common";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box bg="tan">
      <Nav />
      <Flex
        flexWrap="nowrap"
        alignItems="stretch"
        borderBottom="1px solid black"
      >
        {children}
      </Flex>
    </Box>
  );
};
