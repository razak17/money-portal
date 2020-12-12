import React from "react";
import { Flex } from "@chakra-ui/react";
import { StatStack } from "./";

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
    <Flex flexWrap="wrap" padding="0 1em" mb="1em">
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
    </Flex>
  );
};
