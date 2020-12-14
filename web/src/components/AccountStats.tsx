import React from "react";
import { Flex } from "@chakra-ui/react";
import { StatStack } from "./partials";
import { getRound } from "../utils/getRound";

interface AccountStatsProps {
  balance: number;
  spending: number;
  deposits: number;
  transactions: number;
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
        withSign
        title="Current Balalnce"
        value={getRound(balance)}
        loading={loading}
      />
      <StatStack
        withSign
        title="Monthly Spending"
        value={getRound(spending)}
        loading={loading}
      />
      <StatStack
        withSign
        title="Monthly Deposits"
        value={getRound(deposits)}
        loading={loading}
      />
      <StatStack
        title="Monthly Transactions"
        value={transactions ? transactions.toString() : "0"}
        loading={loading}
      />
    </Flex>
  );
};
