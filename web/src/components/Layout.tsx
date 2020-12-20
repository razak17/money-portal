import * as React from "react";
import { NavBar } from "./partials";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { SideBar, Footer } from "./";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const bg = useColorModeValue("gray.50", "brandDark.300")
  const color = useColorModeValue("brandBlue.800", "gray.300")
  return (
    <Box bg={bg} color={color}>
      <NavBar />
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
          width={{ base: "100%", xl: "80%" }}
          paddingBottom="70px"
        >
          {children}
          <Footer />
        </Box>
      </Flex>
    </Box>
  );
};

