import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { WrapperVariant } from "../../types";

interface WrapperProps {
  variant?: WrapperVariant;
  center?: boolean;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
  center = false,
}) => {
  if (center) {
    return (
      <Flex
        height="100vh"
        width="80%"
        m="0 auto"
        p={2}
        flexWrap="nowrap"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
      >
        <Box width="70%" p={2} overflow="auto">
          {children}
        </Box>
      </Flex>
    );
  } else {
    return (
      <Box
        mt={8}
        pb="6em"
        mx="auto"
        maxW={variant === "regular" ? "80%" : "25%"}
        w="100%"
      >
        {children}
      </Box>
    );
  }
};
