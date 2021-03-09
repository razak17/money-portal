import React from "react";
import { Flex, useColorModeValue} from "@chakra-ui/react";
import { BORDER_BG_LIGHT, BORDER_BG_DARK } from '../../constants';

export const SideBarWrapper: React.FC = ({ children }) => {
  const bg = useColorModeValue("gray.50", "brandDark.700")
  const borderBg = useColorModeValue(BORDER_BG_LIGHT, BORDER_BG_DARK);

  return (
    <Flex
      bg={bg}
      position="sticky"
      flexDir="column"
      borderRight={borderBg}
      top={0}
      bottom={0}
      left={0}
      zIndex={1}
      height="100vh"
      maxH="100%"
      overflowY="auto"
      width={{ base: "0", sm: "0", md: "0", xl: "20%" }}
      overflowWrap="break-word"
    >
      {children}
    </Flex>
  );
};

