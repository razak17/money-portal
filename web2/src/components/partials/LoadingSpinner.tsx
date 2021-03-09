import * as React from "react";
import { Spinner } from "@chakra-ui/react";
import { Wrapper } from "./";
import { Box, Flex } from "@chakra-ui/react";
import { WrapperVariant } from "../../types";

interface Props {
  variant?: WrapperVariant;
}

export const LoadingSpinner: React.FC<Props> = ({ variant = "regular" }) => {
  if (variant === "small") {
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
