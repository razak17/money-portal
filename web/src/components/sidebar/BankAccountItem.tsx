import * as React from "react";
import {
  Link as ChakraLink,
  ListItem,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FaPiggyBank, FaMoneyCheckAlt, FaCreditCard } from 'react-icons/fa'
import { toTitleCase } from "../../utils";
import NextLink from "next/link";
import { AuthRoutes } from "../../api/routes";
import { BankAccountOptions } from '../../types';

interface BankAccountItemProps {
  id: number;
  type: string;
  name: string;
  color: string;
  colorActive: string;
  hColor: string;
  textColor: string;
  textColorActive: string;
  itemBg: string;
  borderColor: string;
  intId: number;
}

export const BankAccountItem: React.FC<BankAccountItemProps> = ({
  id,
  type,
  name,
  color,
  colorActive,
  hColor,
  textColor,
  textColorActive,
  itemBg,
  borderColor,
  intId
}) => {
  return (
    <ListItem
      bg={id === intId ? itemBg: ""}
      borderLeft={id === intId ? borderColor : ""}
      fontSize="sm"
      position="relative"
    >
      <NextLink
        href={`${AuthRoutes.TRANSACTIONS}/[id]`}
        as={`${AuthRoutes.TRANSACTIONS}/${id}`}
      >
        <ChakraLink
          display="block"
          position="relative"
        >
          <Flex
            padding="1.5em 0 1.5em 5.5em"
            flexWrap="wrap"
            color={id === intId ? colorActive : color}
            _hover={{
              color: hColor,
              bg: itemBg
            }}
          >
            <Icon
              textStyle="iconWrapAlt"
              as={
                type === BankAccountOptions.CHECKING ? FaMoneyCheckAlt :
                type === BankAccountOptions.CREDIT ? FaCreditCard :
              FaPiggyBank
              }
            />
            <Text color={id === intId ? textColorActive : textColor}>
              {toTitleCase(name)}
            </Text>
          </Flex>
        </ChakraLink>
      </NextLink>
    </ListItem>
  );
};

