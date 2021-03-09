import * as React from "react";
import {
  Box,
  List,
  Button,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  chakra,
  Flex,
  Icon,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { FaUniversity } from 'react-icons/fa'
import {
  useBankAccountsQuery,
  useTotalBankAccountsQuery,
} from "../../generated/graphql";
import { LIMIT } from "../../constants";
import { BankAccountItem } from './';

interface BankAccountsProps {
  color: string;
  colorActive: string;
  hBg: string;
  itemBg: string;
  hColor: string;
  textColor: string;
  textColorActive: string;
  borderColor: string;
  listBg: string;
  intId: number;
}

export const BankAccounts: React.FC<BankAccountsProps> = ({
  color,
  colorActive,
  hBg,
  itemBg,
  hColor,
  textColor,
  textColorActive,
  borderColor,
  listBg,
  intId
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const btnHover = useColorModeValue("brandBlue.400", "brandGreen.600")
  const btnColor = useColorModeValue("gray.50", "gray.200")
  const btnBg = useColorModeValue("brandBlue.500", "brandGreen.500")

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
            size="xs"
            bg={btnBg}
            color={btnColor}
            _hover={{
              bg: btnHover
            }}
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
            Show More
          </Button>
        </Box>
      ) : null}
    </>
  );

  const bankAccountsList = (
    <AccordionPanel bg={listBg} p="0 0 1em 0">
      <List mt={0} maxHeight="none">
        {data?.bankAccounts &&
          data?.bankAccounts.bankAccounts.map((b) => (
            <BankAccountItem
              id={b.id}
              key={b.id}
              intId={intId}
              name={b.name}
              type={b.type}
              color={color}
              colorActive={colorActive}
              hColor={hColor}
              textColor={textColor}
              textColorActive={textColorActive}
              itemBg={itemBg}
              borderColor={borderColor}
            />
          ))}
        {FetchMore}
      </List>
    </AccordionPanel>
  )

  const bankAccountsButton = (
    <AccordionButton onClick={() => setIsOpen(!isOpen)}>
      <Box flex="1" textAlign="left">
        <Flex
          color={color}
          _hover={{
            bg: hBg,
            color: hColor
          }}
          bg={isOpen ? hBg: ""}
          padding="1.5rem 2rem"
          flexWrap='wrap'
          alignItems='center'
        >
          <Icon textStyle="iconWrap" as={FaUniversity} />
          <Text color={textColor}>
            Bank Accounts
            {TotalLoading ? (
              <chakra.sub m="0.25em 0 0 0.rem">(...)</chakra.sub>
            ) : TotalCount && TotalCount?.totalBankAccounts > 0 ? (
              <chakra.sub m="0.25em 0 0 0.4em">
                ({TotalCount?.totalBankAccounts})
              </chakra.sub>
            ) : null}
          </Text>
          <AccordionIcon ml="auto" />
        </Flex>
      </Box>
    </AccordionButton>
  )

  return (
    <Accordion allowToggle>
      <AccordionItem borderBottom="0" borderTop="0" >
        {bankAccountsButton}
        {bankAccountsList}
      </AccordionItem>
    </Accordion>
  );
};

