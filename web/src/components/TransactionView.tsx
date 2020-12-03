import * as React from "react";
import { Box, IconButton, Heading, Text, chakra } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { DeleteTransactionModal } from "./";
import { useGetIntId } from "../utils/useGetIntId";

interface TransactionViewProps {
  id: number;
  index: number;
  amount: number;
  type: string;
  memo: string;
  updatedAt: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editButtonRef: React.RefObject<HTMLButtonElement>;
}

export const TransactionView: React.FC<TransactionViewProps> = ({
  id,
  index,
  amount,
  type,
  memo,
  updatedAt,
  setEditing,
  editButtonRef,
}) => {
  const intId = useGetIntId();
  const [show, setShow] = React.useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <chakra.tr borderWidth="1px" borderRadius="md">
      <chakra.td textAlign="center" p="1rem">
        <Text>{`${index + 1}.`}</Text>
      </chakra.td>
      <chakra.td textAlign="center" p="1rem">
        <Heading color="teal" size="xs">{`$${amount}`}</Heading>
      </chakra.td>
      <chakra.td textAlign="center" p="1rem">
        <Text fontSize="md">{type}</Text>
      </chakra.td>
      <chakra.td textAlign="center" p="1rem">
        <Text fontSize="md">{memo}</Text>
      </chakra.td>
      <chakra.td textAlign="center" p="1rem">
        <Heading size="xs">
          {new Date(parseInt(updatedAt)).toISOString()}
        </Heading>
        <Text fontSize="sm">{updatedAt}</Text>
      </chakra.td>
      <chakra.td>
        <DeleteTransactionModal
          id={id}
          bankAccountId={intId}
          isOpen={show}
          onClose={handleClose}
        />
        <Box textAlign="center">
          <IconButton
            ref={editButtonRef}
            onClick={() => setEditing(true)}
            colorScheme="teal"
            mr={4}
            icon={<EditIcon />}
            aria-label="Edit Transaction"
          />
          <IconButton
            onClick={handleShow}
            colorScheme="red"
            icon={<DeleteIcon />}
            aria-label="Delete Transaction"
          />
        </Box>
      </chakra.td>
    </chakra.tr>
  );
};
