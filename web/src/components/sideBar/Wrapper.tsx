import React from "react";
import { Box } from "@chakra-ui/react";

export const SideBarWrapper: React.FC = ({ children }) => {
  return (
    <Box
      position="sticky"
      borderRight="1px solid black"
      top={0}
      bottom={0}
      left={0}
      zIndex={1}
      height="100vh"
      maxH="100%"
      overflowY="auto"
      width={{ base: "0", sm: "0", md: "0", xl: "260px" }}
      overflowWrap="break-word"
      flexShrink={0}
    >
      {children}
    </Box>
  );
};
