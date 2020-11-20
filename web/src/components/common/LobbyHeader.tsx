import { Box, Heading } from "@chakra-ui/react";
import React from "react";

interface LobbyHeaderProps {
  heading: string;
}

export const LobbyHeader: React.FC<LobbyHeaderProps> = ({ heading }) => {
  return (
    <Box
      marginBottom="2rem"
      borderBottom="1px solid black"
      padding="1.5rem 2rem"
    >
      <Box m="auto" width="100%">
        <Heading size="md">{heading}</Heading>
      </Box>
    </Box>
  );
};
