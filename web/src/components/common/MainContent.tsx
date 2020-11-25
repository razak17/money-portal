import { Box, Flex } from "@chakra-ui/react";
import React from "react";

interface MainContentProps {}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <Box
      position="relative"
      minHeight="100vh"
      width="100%"
      paddingBottom="70px"
    >
      {children}
    </Box>
  );
};
