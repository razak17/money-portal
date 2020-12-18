import * as React from "react";
import { Flex, chakra, Box } from "@chakra-ui/react";

interface TransactionsTableProps {}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  children,
}) => {
  return (
    <Flex overflowX="auto" flexWrap="nowrap" alignItems="center" >
      <Box flex={{ base: "0 0 auto", xl: "0 0 auto" }} padding="1rem 0.5rem">
        <chakra.table borderBottom="1px solid black" width="100%">
          <chakra.thead borderWidth="1px" borderRadius="md">
            <chakra.tr textAlign="left" role="row">
              <chakra.th width="160px" padding="0.5em"></chakra.th>
              <chakra.th width="170px" padding="0.5em">
                Amount
              </chakra.th>
              <chakra.th width="200px" padding="0.5em">
                Type
              </chakra.th>
              <chakra.th width="200px" padding="0.5em">
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
    </Flex>
  );
};
