import * as React from "react";
import { chakra } from "@chakra-ui/react";

interface TransactionsTableProps {}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  children,
}) => {
  const tableHead = (
    <chakra.thead borderWidth="1px" borderRadius="md" bg="gray.200">
      <chakra.tr role="row">
        <chakra.th width="60px" padding="0.5rem 1rem"></chakra.th>
        <chakra.th width="149px" padding="0.5rem 1rem">
          Amount
        </chakra.th>
        <chakra.th width="362px" padding="0.5rem 1rem">
          Type
        </chakra.th>
        <chakra.th width="362px" padding="0.5rem 1rem">
          Memo
        </chakra.th>
        <chakra.th width="288px" padding="0.5rem 1rem">
          Date
        </chakra.th>
        <chakra.th width="200px" padding="0.5rem 1rem"></chakra.th>
      </chakra.tr>
    </chakra.thead>
  );

  return (
    <chakra.table
      borderBottom="1px solid black"
      boxSizing="content-box"
      margin="0 auto"
      width="100%"
    >
      {tableHead}
      <chakra.tbody>{children}</chakra.tbody>
    </chakra.table>
  );
};
