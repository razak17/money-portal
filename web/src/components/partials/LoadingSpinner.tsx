import * as React from "react";
import { Spinner } from "@chakra-ui/react";
import { Wrapper } from "./";
import { Box, Flex } from "@chakra-ui/react";
import { WrapperVariant } from "../../types";

interface Props {
  variant?: WrapperVariant;
  stackStack?: boolean;
}

export const LoadingSpinner: React.FC<Props> = ({ variant = "regular", stackStack }) => {
  if (stackStack && variant === "small") {
    return (
      <Flex
        width="100%"
        m="0"
        overflow="auto"
        flexWrap="nowrap"
        textAlign="left"
        alignItems="center"
        justifyContent="center"
      >
        <Box width="100%" overflow="auto">
          <Spinner />
        </Box>
      </Flex>
    );
  } else if (variant === "small") {
    return (
      <Flex
        width="80%"
        m="0 auto"
        overflow="auto"
        flexWrap="nowrap"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
      >
        <Box width="70%" overflow="auto">
          <Spinner />
        </Box>
      </Flex>
    );
  } else {
    return (
      <Wrapper center>
        <Spinner />
      </Wrapper>
    );
  }
};
