import React from "react";
import { Flex } from "@chakra-ui/react";
import { StatStack } from "./partials";
import { getRound } from "../utils";
import { statOptions } from '../types';

interface AccountStatsProps {
  balance: number | undefined;
  spending: number | undefined;
  deposits: number | undefined;
  monthlyTransactions: number | undefined;
  loading: boolean;
  bg: string;
}

export const AccountStats: React.FC<AccountStatsProps> = ({
  balance,
  spending,
  deposits,
  monthlyTransactions,
  loading,
  bg
}) => {
  return (
    <Flex flexWrap="wrap" alignItems="center" p="0 0.5em" mb="1em">
      <StatStack
        bg={bg}
        withSign
        title={statOptions.CURRENT_BALANCE}
        value={balance ? getRound(balance) : "0"}
        loading={loading}
      />
      <StatStack
        bg={bg}
        withSign
        title={statOptions.MONTHLY_SPENDING}
        value={spending ? getRound(spending) : '0'}
        loading={loading}
      />
      <StatStack
        bg={bg}
        withSign
        title={statOptions.MONTHLY_DEPOSITS}
        value={deposits ? getRound(deposits) : "0"}
        loading={loading}
      />
      <StatStack
        bg={bg}
        title={statOptions.MONTHLY_TRANSACTIONS}
        value={monthlyTransactions ? monthlyTransactions.toString() : "0"}
        loading={loading}
      />
    </Flex>
  );
};
