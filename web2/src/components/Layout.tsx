import * as React from "react";
import { Nav } from "./partials";
import { Box, Flex } from "@chakra-ui/react";
import { SideBar } from "./";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Nav />
      <Flex>
        <SideBar />
        <Box
          position="relative"
          top={0}
          bottom={0}
          left={0}
          right={0}
          overflow="visible"
          display="block"
          width={{ base: "100%", xl: "75%" }}
          paddingBottom="70px"
        >
          {children}
        </Box>
      </Flex>
    </>
  );
};
