import { Box } from "@chakra-ui/react";
import React from "react";

interface MainContentProps {}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <Box
      position="relative"
      top={0}
      bottom={0}
      left={0}
      right={0}
      overflow="visible"
      display="block"
      width="100%"
      paddingBottom="70px"
    >
      {children}
    </Box>
  );
};
