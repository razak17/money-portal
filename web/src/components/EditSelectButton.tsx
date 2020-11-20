import { Flex, Box, Button } from "@chakra-ui/react";
import React from "react";

interface EditSelectButtonProps {}

export const EditSelectButton: React.FC<EditSelectButtonProps> = () => {
  return (
    <Flex flexWrap="wrap" mb="2rem" p="1.5rem 2rem">
      <Flex flex={1}>
        <Box ml="auto">
          <Button
            onClick={async () => {
              console.log("hello");
            }}
          >
            Edit Account
          </Button>
          <Button
            ml={4}
            onClick={async () => {
              console.log("hello");
            }}
          >
            Delete Account
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};
