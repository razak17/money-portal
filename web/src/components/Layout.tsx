import * as React from "react";
import { NavBar } from "./partials";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { SideBar, Footer } from "./";
import { BORDER_BG_LIGHT, BORDER_BG_DARK } from '../constants';

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const bg = useColorModeValue("gray.50", "brandDark.800")
  const color = useColorModeValue("brandBlue.700", "brandGray.200")

  const altBg = useColorModeValue("gray.50", "brandDark.700")
  const borderBg = useColorModeValue(BORDER_BG_LIGHT, BORDER_BG_DARK);

  return (
    <Box bg={bg} color={color}>
      <NavBar bg={altBg} />
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
          <Footer bg={altBg} borderBg={borderBg} />
        </Box>
      </Flex>
    </Box>
  );
};

