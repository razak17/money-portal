import * as React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface EditDeleteTraansactionProps {
  onOpenDelete: any;
  isEditing: any;
}

export const EditDeleteTransactionButton: React.FC<EditDeleteTraansactionProps> = ({
  onOpenDelete,
  isEditing,
}) => {
  return (
    <Box textAlign="center">
      <IconButton
        onClick={isEditing}
        colorScheme="teal"
        mr={4}
        icon={<EditIcon />}
        aria-label="Edit Transaction"
      />
      <IconButton
        onClick={onOpenDelete}
        colorScheme="red"
        icon={<DeleteIcon />}
        aria-label="Delete Transaction"
      />
    </Box>
  );
};
