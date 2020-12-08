import * as React from "react";
import { chakra, Box } from "@chakra-ui/react";

interface TransactionsTableProps {}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  children,
}) => {
  return (
    <Box flex={{ base: "0 0 auto", xl: "0 0 40%" }} padding="1rem 0.5rem">
      <Box overflowX="auto">
        <chakra.table borderBottom="1px solid black" width="100%">
          <chakra.thead borderWidth="1px" borderRadius="md" bg="gray.200">
            <chakra.tr textAlign="left" role="row">
              <chakra.th width="100px" padding="0.5em"></chakra.th>
              <chakra.th width="200px" padding="0.5em">
                Amount
              </chakra.th>
              <chakra.th width="200px" padding="0.5em">
                Type
              </chakra.th>
              <chakra.th width="362px" padding="0.5em">
                Memo
              </chakra.th>
              <chakra.th width="200px" padding="0.5em">
                Date
              </chakra.th>
            </chakra.tr>
          </chakra.thead>
          <chakra.tbody>{children}</chakra.tbody>
        </chakra.table>
      </Box>
    </Box>
  );
};
