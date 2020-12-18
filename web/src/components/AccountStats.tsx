import React from "react";
import { Flex } from "@chakra-ui/react";
import { StatStack } from "./partials";
import { getRound } from "../utils";
import { statOptions } from '../types';

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
    <Flex flexWrap="wrap" padding="0 0.5em" mb="1em">
      <StatStack
        withSign
        title={statOptions.CURRENT_BALANCE}
        value={balance ? getRound(balance) : "0"}
        loading={loading}
      />
      <StatStack
        withSign
        title={statOptions.MONTHLY_SPENDING}
        value={spending ? getRound(spending) : '0'}
        loading={loading}
      />
      <StatStack
        withSign
        title={statOptions.MONTHLY_DEPOSITS}
        value={deposits ? getRound(deposits) : "0"}
        loading={loading}
      />
      <StatStack
        title={statOptions.MONTHLY_TRANSACTIONS}
        value={transactions ? transactions.toString() : "0"}
        loading={loading}
      />
    </Flex>
  );
};
