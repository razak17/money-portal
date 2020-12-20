import { useColorModeValue, Flex, Text } from "@chakra-ui/react";
import { BORDER_BG_LIGHT, BORDER_BG_DARK } from '../../constants';
import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  const bg = useColorModeValue("gray.50", "brandDark.400")
  const borderBg = useColorModeValue(BORDER_BG_LIGHT, BORDER_BG_DARK);

  return (
    <Flex
      bg={bg}
      height="4em"
      width="100%"
      position="absolute"
      marginTop="auto"
      bottom={0}
      borderTop={borderBg}
      p={6}
    >
      <Flex
        justifyContent="center"
        textAlign="center"
        flex={1}
        alignItems="center"
      >
        <Text>Razak Mo - {new Date().getFullYear()}</Text>
      </Flex>
    </Flex>
  );
};

