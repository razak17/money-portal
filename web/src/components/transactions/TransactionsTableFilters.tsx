import * as React from "react";
import {
  Box,
  Heading,
  chakra,
  Flex,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { filterOptions } from "../../types";
import { PAGE } from '../../constants';
import { toTitleCase } from "../../utils/toTitleCase";

interface TransactionsTableFiltersProps {
  filter: string;
  setFilter: React.Dispatch<any>;
  loading: boolean;
  count: number | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const TransactionsTableFilters: React.FC<TransactionsTableFiltersProps> = ({
  filter,
  setFilter,
  count,
  loading,
  setPage,
}) => {
  const heading = (
    <Box w={{ base: "100%", sm: "100%", md: "30%", xl: "25%" }} flex="0 auto">
      <Flex flexWrap="wrap" p="0.5em 0">
        <Heading size="md">Transactions</Heading>
        {loading ? (
          <chakra.sub m="1.5em 0 0 0.4em">(...)</chakra.sub>
        ) : count && count > 0 ? (
          <chakra.sub m="1.5em 0 0 0.4em">({count})</chakra.sub>
        ) : null}
      </Flex>
    </Box>
  );

  const filters = (
    <Box w={{ base: "100%", sm: "100%", md: "70%", xl: "75%" }} flex="0 auto">
      <Flex flexWrap="wrap" p="0.5em 0">
        <ButtonGroup ml={{ base: "0", md: "auto" }} flexWrap="wrap" spacing="4">
          {filterOptions.map((option, index) => (
            <Button
              onClick={() => {
                setPage(PAGE);
                setFilter(option);
              }}
              key={index}
              variant="link"
              colorScheme={option === filter ? "yellow" : ""}
            >
              {toTitleCase(option)}
            </Button>
          ))}
        </ButtonGroup>
      </Flex>
    </Box>
  );

  return (
    <Flex flexWrap="wrap" mb="0.5em" p="0 0.5em">
      {heading}
      {count && count > 0 ?
        filters
      : null}
    </Flex>
  );
};
