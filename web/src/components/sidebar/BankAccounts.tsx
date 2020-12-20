import * as React from "react";
import {
  Box,
  Link as ChakraLink,
  List,
  ListItem,
  Button,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  chakra,
  Flex,
  Icon,
  useColorModeValue
} from "@chakra-ui/react";
import { FaPiggyBank, FaMoneyCheckAlt, FaCreditCard, FaUniversity } from 'react-icons/fa'
import { toTitleCase } from "../../utils/toTitleCase";
import {
  useBankAccountsQuery,
  useTotalBankAccountsQuery,
} from "../../generated/graphql";
import NextLink from "next/link";
import { LIMIT } from "../../constants";
import { AuthRoutes } from "../../api/routes";
import { BankAccountOptions } from '../../types';

interface BankAccountsProps {}

export const BankAccounts: React.FC<BankAccountsProps> = () => {
  const color = useColorModeValue("brandBlue.500", "green.500")
  const loadMoreColor = useColorModeValue("brandBlue.600", "green.500")
  const hBg = useColorModeValue("brandBlue.50", "brandDark.100")

  const { data, loading, variables, fetchMore } = useBankAccountsQuery({
    variables: {
      limit: LIMIT,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: TotalCount,
    loading: TotalLoading,
  } = useTotalBankAccountsQuery();

  const FetchMore = (
    <>
      {data?.bankAccounts && data.bankAccounts.hasMore ? (
        <Box textAlign="left" padding="1.5em 0 1.5em 5.5em">
          <Button
            color={loadMoreColor}
            size="xs"
            isLoading={loading}
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.bankAccounts.bankAccounts[
                      data.bankAccounts.bankAccounts.length - 1
                    ].createdAt,
                },
              });
            }}
          >
            Load More
          </Button>
        </Box>
      ) : null}
    </>
  );

  const bankAccountsList = (
    <AccordionPanel p="0 0 1em 0">
      <List mt={0} maxHeight="none">
        {data?.bankAccounts &&
          data?.bankAccounts.bankAccounts.map((b) => (
            <ListItem fontSize={12} key={b.id} position="relative">
              <NextLink
                href={`${AuthRoutes.TRANSACTIONS}/[id]`}
                as={`${AuthRoutes.TRANSACTIONS}/${b.id}`}
              >
                <ChakraLink
                  display="block"
                  position="relative"
                  padding="1.5em 0 1.5em 5.5em"
                >
                  <Icon
                    color={color}
                    textStyle="iconWrapAlt"
                    as={
                    b.type === BankAccountOptions.CHECKING ? FaMoneyCheckAlt :
                    b.type === BankAccountOptions.CREDIT ? FaCreditCard :
                    FaPiggyBank
                  }/>
                  {toTitleCase(b.name)}
                </ChakraLink>
              </NextLink>
            </ListItem>
          ))}
        {FetchMore}
      </List>
    </AccordionPanel>
  )

  return (
    <Accordion allowToggle>
      <AccordionItem borderBottom="0" borderTop="0" >
        <AccordionButton
          _hover={{
            bg: hBg
          }}
          _focus={{
            boxShadow: "none",
          }}
          padding="1.5rem 2rem"
        >
          <Box flex="1" textAlign="left">
            <Flex flexWrap='wrap' alignItems='center'>
              <Icon
                color={color}
                textStyle="iconWrap"
                as={FaUniversity}
              />
              Bank Accounts
              {TotalLoading ? (
                <chakra.sub m="0.25em 0 0 0.rem">(...)</chakra.sub>
              ) : TotalCount && TotalCount?.totalBankAccounts > 0 ? (
                <chakra.sub m="0.25em 0 0 0.4em">
                  ({TotalCount?.totalBankAccounts})
                </chakra.sub>
              ) : null}
            </Flex>
          </Box>
        </AccordionButton>
        {bankAccountsList}
      </AccordionItem>
    </Accordion>
  );
};

