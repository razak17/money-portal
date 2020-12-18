import React from "react";
import { Flex,} from "@chakra-ui/react";

export const SideBarWrapper: React.FC = ({ children }) => {
  return (
    <Flex
      position="sticky"
      flexDir="column"
      borderRight="1px solid black"
      top={0}
      bottom={0}
      left={0}
      zIndex={1}
      height="100vh"
      maxH="100%"
      overflowY="auto"
      width={{ base: "0", sm: "0", md: "0", xl: "25%" }}
      overflowWrap="break-word"
    >
      {children}
    </Flex>
  );
};

