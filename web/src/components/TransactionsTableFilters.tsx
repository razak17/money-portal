import * as React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { filterOptions } from "../types";

interface Props {
  loading: boolean;
  count: number | undefined;
}

export const TransactionsTableFilters: React.FC<Props> = ({
  loading,
  count,
}) => {
  return (
    <Flex mb="1rem">
      <Flex flexWrap="wrap">
        <Heading size="md">Transactions</Heading>
        {loading ? (
          <Text m="0.25rem 0 0 0.4rem">(-)</Text>
        ) : count ? (
          <Text m="0.25rem 0 0 0.4rem">({count})</Text>
        ) : null}
      </Flex>
      <Flex ml="auto" flexWrap="wrap">
        <ButtonGroup variant="outline" spacing="4">
          {filterOptions.map((option, index) => (
            <Button key={index} variant={option.active ? "solid" : "link"}>
              {option.name}
            </Button>
          ))}
        </ButtonGroup>
        <Box
          width="auto"
          maxW="100%"
          cursor="pointer"
          flex="0 0 auto"
          position="relative"
          ml={6}
          alignItems="center"
          paddingTop={1}
        >
          <Heading size="md">x</Heading>
        </Box>
      </Flex>
    </Flex>
  );
};
