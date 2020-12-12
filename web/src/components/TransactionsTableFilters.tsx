import * as React from "react";
import { Flex, Button, ButtonGroup } from "@chakra-ui/react";
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
    </Flex>
  );
};
