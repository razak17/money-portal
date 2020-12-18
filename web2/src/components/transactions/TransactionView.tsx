import * as React from "react";
import { IconButton, Heading, Text, chakra } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { DeleteTransactionModal } from "./";
import { useGetIntId } from "../../utils/useGetIntId";
import { getRound } from "../../utils/getRound";
import { TransactionOptions } from "../../types";

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

const TableData: React.FC = ({ children }) => {
  return (
    <chakra.td textAlign="left" p="1em 0.5em">
      {children}
    </chakra.td>
  );
};

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
      <chakra.td textAlign="center" p="0.5em">
        <DeleteTransactionModal
          id={id}
          bankAccountId={intId}
          isOpen={show}
          onClose={handleClose}
        />
        <IconButton
          height="2em"
          minW="2em"
          mr={2}
          ref={editButtonRef}
          onClick={() => setEditing(true)}
          colorScheme="teal"
          icon={<EditIcon />}
          aria-label="Edit Transaction"
        />
        <IconButton
          height="2em"
          minW="2em"
          onClick={handleShow}
          colorScheme="red"
          icon={<DeleteIcon />}
          aria-label="Delete Transaction"
        />
      </chakra.td>

      <TableData>
        <Heading
          color={
            type === TransactionOptions.TRANSFER
              ? "yellow.400"
              : type === TransactionOptions.DEPOSIT
              ? "green.600"
              : "red.500"
          }
          size="xs"
        >{`$${getRound(amount)}`}</Heading>
      </TableData>
      <TableData>
        <Text fontSize="md">{type}</Text>
      </TableData>
      <TableData>
        <Text fontSize="md">{memo}</Text>
      </TableData>
      <TableData>
        <Heading size="xs">
          {new Date(parseInt(updatedAt)).toISOString()}
        </Heading>
        <Text fontSize="sm">{updatedAt}</Text>
      </TableData>
    </chakra.tr>
  );
};
