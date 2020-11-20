import { Box, Heading } from "@chakra-ui/react";
import React from "react";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <Box>
      <Heading size="md">Home Sweet Home</Heading>
    </Box>
  );
};
