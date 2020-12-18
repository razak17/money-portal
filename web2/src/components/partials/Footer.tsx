import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <Flex
      height="4em"
      width="100%"
      position="absolute"
      marginTop="auto"
      bottom={0}
      borderTop="1px solid black"
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
