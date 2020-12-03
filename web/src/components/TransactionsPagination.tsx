import { Box, Flex, Text, Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";

interface TransactionsPaginationProps {}

export const TransactionsPagination: React.FC<TransactionsPaginationProps> = () => {
  return (
    <Flex p="1rem 0 1rem 0" flexWrap="wrap">
      <Text> Showing 10 of entries of 40</Text>
      <Box ml="auto">
        <ButtonGroup variant="outline" spacing="1">
          <Button p="0.5rem 1rem" variant="link">
            Previous
          </Button>
          <Button variant="solid">1</Button>
          <Button variant="link">2</Button>
          <Button variant="link">3</Button>
          <Button variant="link">4</Button>
          <Button variant="link">5</Button>
          <Button onClick={() => {}} p="0.5rem 1rem" variant="link">
            Next
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
};
