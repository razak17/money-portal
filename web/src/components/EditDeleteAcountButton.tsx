import { Flex, Box, Button } from "@chakra-ui/react";
import React from "react";

interface EditSelectButtonProps {
  onOpenEdit: () => void;
  onOpenDelete: () => void;
}

export const EditDeleteAccountButton: React.FC<EditSelectButtonProps> = ({
  onOpenEdit,
  onOpenDelete,
}) => {
  return (
    <Flex flexWrap="wrap" mb="2rem" p="1.5rem 2rem">
      <Flex flex={1}>
        <Box ml="auto">
          <Button onClick={onOpenEdit}>Edit Account</Button>
          <Button ml={4} onClick={onOpenDelete}>
            Delete Account
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};