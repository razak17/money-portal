import * as React from "react";
import { Box, Heading } from "@chakra-ui/react";

interface HeaderProps {
  text: string;
}

export const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <Box mb="1em" mt="1em" ml="2em">
      <Heading size="md">{text}</Heading>
    </Box>
  );
};

