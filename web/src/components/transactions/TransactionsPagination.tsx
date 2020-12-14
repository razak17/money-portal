import * as React from "react";
import { Box, Flex, Text, Button, ButtonGroup } from "@chakra-ui/react";

interface TransactionsPaginationProps {
  limit: number;
  page: number;
  count: number | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const TransactionsPagination: React.FC<TransactionsPaginationProps> = ({
  limit,
  count,
  setPage,
  page,
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
      }}
      p="0.5em 1em"
    >
      Next
    </Button>
  );

  const pagination = (
    <Flex flexWrap="wrap" overflowX="auto">
      <Box w="100%" flex="1">
        <Flex flexWrap="wrap">
          <Box p={{ base: "0.5em 0", md: "0" }} ml={{ base: "0", md: "auto" }}>
            {prev}
            <ButtonGroup p="0 1em" variant="solid" spacing="4">
              {count ? paginate(total) : null}
            </ButtonGroup>
            {next}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );

  return (
    <Box p="0.5em">
      {count ? (
        <Box p="0.5em 0">
          <Text>
            Showing{" "}
            {`${page * limit - (limit - 1)} - ${Math.min(page * limit, count)}`}{" "}
            of {count} entries
          </Text>
        </Box>
      ) : null}
      {pagination}
    </Box>
  );
};
