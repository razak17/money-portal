import React from "react";
import { HStack, Box } from "@chakra-ui/react";
import { StatStack } from "./common";

interface AccountStatsProps {
  balance: number | undefined;
  spending: number | undefined;
  deposits: number | undefined;
  transactions: number | undefined;
  loading: boolean;
}

export const AccountStats: React.FC<AccountStatsProps> = ({
  balance,
  spending,
  deposits,
  transactions,
  loading,
}) => {
  return (
    <Box padding="0 2rem" mb="1rem">
      <HStack spacing={8}>
        <StatStack
          withSign={balance ? true : false}
          title="Current Balalnce"
          value={balance}
          loading={loading}
        />
        <StatStack
          withSign={spending ? true : false}
          title="Monthly Spending"
          value={spending}
          loading={loading}
        />
        <StatStack
          withSign={deposits ? true : false}
          title="Monthly Deposits"
          value={deposits}
          loading={loading}
        />
        <StatStack
          title="Monthly Transactions"
          value={transactions}
          loading={loading}
        />
      </HStack>
    </Box>
  );
};
