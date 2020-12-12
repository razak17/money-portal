import * as React from "react";
import { Box, Flex, Text, Button, ButtonGroup } from "@chakra-ui/react";
import { ApolloQueryResult } from "@apollo/client";

interface TransactionsPaginationProps {
  limit: number;
  page: number;
  count: number | undefined;
  fetchMore: (n: number) => Promise<ApolloQueryResult<unknown>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const TransactionsPagination: React.FC<TransactionsPaginationProps> = ({
  limit,
  count,
  fetchMore,
  setPage,
  page,
}) => {
  let total = 1;

  const pagination = (count: number) => {
    total = Math.ceil(count / limit);
    let btns = [];

    for (let i = 1; i <= total; i++) {
      btns.push(
        <Button
          key={i * 2}
          variant="solid"
          disabled={page === i}
          onClick={() => {
            setPage(i);
            fetchMore(i);
          }}
        >
          {i}
        </Button>
      );
    }
    return btns;
  };

  return (
    <Flex p="1em 0.5em" flexWrap="wrap">
      {count ? (
        <Box p="0.5em 0" textAlign="center">
          <Text>
            Showing{" "}
            {`${page * limit - (limit - 1)} - ${Math.min(page * limit, count)}`}{" "}
            of {count} entries
          </Text>
        </Box>
      ) : null}
      <Box
        p={{ base: "1em 0", md: "0" }}
        ml={{ base: "auto", sm: "0", md: "auto" }}
      >
        <Button
          disabled={page <= 1}
          onClick={() => {
            setPage(page - 1);
            fetchMore(page - 1);
          }}
          p="0.5rem 1rem"
          variant="link"
        >
          Previous
        </Button>
        <ButtonGroup variant="outline" spacing="4">
          {count ? pagination(count) : null}
        </ButtonGroup>
        <Button
          disabled={page >= total}
          onClick={() => {
            setPage(page + 1);
            fetchMore(page + 1);
          }}
          p="0.5rem 1rem"
          variant="link"
        >
          Next
        </Button>
      </Box>
    </Flex>
  );
};
