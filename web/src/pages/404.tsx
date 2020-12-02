import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface Props {}

export const NotFoundPage: React.FC<Props> = () => {
  return (
    <Box textAlign="center" mt="20rem">
      <Text fontSize="3xl">404 | That Page does not exist!</Text>
    </Box>
  );
};
