import React from "react";
import { Box, Heading, Flex, Text, Icon } from "@chakra-ui/react";
import { LoadingSpinner } from "./";
import { statOptions } from '../../types';
import { FaMoneyBillAlt, FaReceipt, FaHandHolding, FaExchangeAlt } from 'react-icons/fa';

interface StatStackProps {
  title: string;
  value: string | undefined;
  loading: boolean;
  withSign?: boolean;
}

export const StatStack: React.FC<StatStackProps> = ({
  title,
  value,
  loading,
  withSign = false,
}) => {
  return (
    <Box
      flex="0 0 auto"
      p="1em"
      w={{ base: "100%", sm: "100%", md: "50%", xl: "25%" }}
    >
      <Flex
        position="relative"
        borderWidth="1px"
        borderRadius="md"
        shadow="xs"
      >
        <Box flex="1 1 auto" p="1.5em 1em">
          <Flex
            justifyContent="center"
            alignItems="center"
            mb={2}
            textTransform="uppercase"
          >
            {title === statOptions.CURRENT_BALANCE ? (
            <Icon mb={2} w='2em' h='1.5em' as={FaMoneyBillAlt} />
            ) : title === statOptions.MONTHLY_SPENDING ? (
            <Icon mb={2} w='2em' h='1.5em' as={FaReceipt} />
            ) : title === statOptions.MONTHLY_DEPOSITS ? (
            <Icon mb={2} w='2em' h='1.5em' as={FaHandHolding} />
            ) : title === statOptions.MONTHLY_TRANSACTIONS ? (
            <Icon mb={2} w='1.5em' h='1.5em' as={FaExchangeAlt} />
            ) : null}
            <Box
              textAlign="left"
              flex="0 auto"
              w={{ base: "100%", sm: "100%", md: "100%", xl: "100%" }}
              p="0 1em"
            >
              <Heading
                size="xs"
              >
                {title}
              </Heading>
            </Box>
          </Flex>
          <Flex justifyContent="left" pl="3em">
            {loading ? (
              <LoadingSpinner variant="small" />
            ) : (
              <Text
                fontSize="3xl"
                color={
                  title === statOptions.MONTHLY_TRANSACTIONS
                    ? "yellow.400"
                    : title === statOptions.MONTHLY_DEPOSITS
                    ? "green.600"
                    : title === statOptions.MONTHLY_SPENDING
                    ? "red.600"
                    : title === statOptions.CURRENT_BALANCE
                      && value && parseInt(value) < 0
                    ? "red.600"
                    : title === statOptions.CURRENT_BALANCE
                      && value && parseInt(value) > 0
                    ? "green.600"
                    : ""
                }
              >
                {withSign ? `$${value}` : value}
              </Text>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
