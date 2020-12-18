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
  Text,
} from "@chakra-ui/react";
import { toTitleCase } from "../../utils/toTitleCase";
import {
  useBankAccountsQuery,
  useTotalBankAccountsQuery,
} from "../../generated/graphql";
import { Link } from "react-router-dom";
import { LIMIT } from "../../constants";
import { AuthRoutes } from "../../api/routes";

interface BankAccountsProps {}

export const BankAccounts: React.FC<BankAccountsProps> = () => {
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
        <Box textAlign="left" padding="1.5em 0 1.5em 4em">
          <Button
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

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton padding="1.5rem 2rem">
          <Box flex="1" textAlign="left">
            Bank Accounts
            {TotalLoading ? (
              <chakra.sub m="0.25em 0 0 0.rem">(...)</chakra.sub>
            ) : TotalCount && TotalCount?.totalBankAccounts > 0 ? (
              <chakra.sub m="0.25em 0 0 0.4em">
                ({TotalCount?.totalBankAccounts})
              </chakra.sub>
            ) : null}
          </Box>
        </AccordionButton>
        <AccordionPanel p="0 0 1em 0">
          <List mt={0} maxHeight="none">
            {data?.bankAccounts &&
              data?.bankAccounts.bankAccounts.map((b) => (
                <ListItem fontSize={12} key={b.id} position="relative">
                  <ChakraLink
                    as={Link}
                    to={`${AuthRoutes.TRANSACTIONS}/${b.id}`}
                    display="block"
                    position="relative"
                    padding="1.5em 0 1.5em 4em"
                  >
                    <Text>{toTitleCase(b.name)}</Text>
                  </ChakraLink>
                </ListItem>
              ))}
            {FetchMore}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
