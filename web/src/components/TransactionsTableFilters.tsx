import * as React from "react";
import { Box, Flex, Heading, Button, ButtonGroup } from "@chakra-ui/react";
import { filterOptions } from "../types";

interface Props {}

export const TransactionsTableFilters: React.FC<Props> = () => {
  return (
    <Flex ml={{ sm: "0", md: "auto" }} flexWrap="wrap" p="0.5em 0">
      <ButtonGroup flexWrap="wrap" spacing="4">
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
        ml={{ base: "auto", sm: "auto", md: "2em" }}
        textAlign="center"
        p={{
          sm: "0.25em 0 0 1.5em",
          md: "0.25em 0 0 2em",
        }}
      >
        <Heading size="md">x</Heading>
      </Box>
    </Flex>
  );
};
