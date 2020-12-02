import { Box, Heading } from "@chakra-ui/react";
import React from "react";

interface PageHeaderProps {
  heading: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ heading }) => {
  return (
    <Box mb="1rem" borderBottom="1px solid black" padding="1.5rem 2rem">
      <Box m="auto" width="100%">
        <Heading size="md">{heading}</Heading>
      </Box>
    </Box>
  );
};
