import * as React from "react";
import { Box, Flex, Text, Button, ButtonGroup } from "@chakra-ui/react";
import { ApolloQueryResult } from '@apollo/client';
import { TransactionsQuery } from '../../generated/graphql';

interface TransactionsPaginationProps {
  limit: number;
  page: number;
  count: number | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  moreData: (n: number) => Promise<ApolloQueryResult<TransactionsQuery>>
}

export const TransactionsPagination: React.FC<TransactionsPaginationProps> = ({
  limit,
  count,
  setPage,
  page,
  moreData
}) => {
  let total = 1;
  if (count) {
    total = Math.ceil(count / limit);
  }

  const paginate = (total: number) => {
    let btns = [];

    for (let i = 1; i <= total; i++) {
      btns.push(
        <Button
          key={i * 2}
          colorScheme="blue"
          borderRadius="10px"
          disabled={page === i}
          onClick={() => {
            setPage(i);
            moreData(i)
          }}
        >
          {i}
        </Button>
      );
    }
    return btns;
  };

  const prev = (
    <Button
      colorScheme="teal"
      disabled={page <= 1}
      onClick={() => {
        setPage(page - 1);
        moreData(page - 1);
      }}
      p="0.5em 1em"
    >
      Previous
    </Button>
  );

  const next = (
    <Button
      colorScheme="teal"
      disabled={page >= total}
      onClick={() => {
        setPage(page + 1);
        moreData(page + 1);
      }}
      p="0.5em 1em"
    >
      Next
    </Button>
  );

  const pagination = (
    <Box w={{ base: "100%", md: "55%", xl: "75%" }} flex="0 auto">
      <Flex flexWrap="nowrap" overflowX="auto">
        <Box p={{ base: "0.5em 0", md: "0" }} ml={{ base: "0", md: "auto" }}>
          <Flex p="1em" flexWrap="nowrap" overflowX="auto">
            {page > 1 ? (
              prev
            ) : null}
            <ButtonGroup p={{base: "0 1em", md: "0.5 1em"}} variant="solid" spacing="4">
              {count ? paginate(total) : null}
            </ButtonGroup>
            {page < total ? (
              next
            ) : null}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );

  return (
    <Flex p="1em 0" flexWrap="wrap">
      {count ? (
        <Box p={{base: "1em", md: "0.5 1em"}} w={{ base: "100%", md: "45%", xl: "25%" }} flex="0 auto">
          <Text>
            Showing{" "}
            {`${page * limit - (limit - 1)} - ${Math.min(page * limit, count)}`}{" "}
            of {count} {count > 1 ? "entries" : "entry"}
          </Text>
        </Box>
      ) : null}
      {pagination}
    </Flex>
  );
};

