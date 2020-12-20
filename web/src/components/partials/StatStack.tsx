import React from "react";
import { useColorModeValue, Box, Heading, Flex, Text, Icon } from "@chakra-ui/react";
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
  const bg = useColorModeValue("whiteAlpha.800", "brandDark.400")
  return (
    <Box
      flex="0 0 auto"
      p="1em"
      w={{ base: "100%", sm: "100%", md: "50%", lg: "25%" }}
    >
      <Flex
        bg={bg}
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
            <Icon
              mb={2}
              fontSize='1.5em'
              as={
                title === statOptions.CURRENT_BALANCE ?  FaMoneyBillAlt :
                title === statOptions.MONTHLY_SPENDING ? FaReceipt :
                title === statOptions.MONTHLY_DEPOSITS ? FaHandHolding :
                FaExchangeAlt
              }
            />
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
