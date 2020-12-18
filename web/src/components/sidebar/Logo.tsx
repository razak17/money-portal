import * as React from "react";
import { Box, Heading, Flex, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { NonAuthRoutes } from '../../api/routes';

interface Props {}

export const Logo: React.FC<Props> = () => {
  return (
    <Box position="relative" borderBottom="1px solid black">
        <NextLink href={NonAuthRoutes.HOME}>
          <ChakraLink>
            <Flex
              p="2rem"
              flexWrap="wrap"
              letterSpacing="0.1em"
              textTransform="uppercase"
            >
              <Heading size="lg">Money|</Heading>
              <Heading color="teal.700" size="lg">
                Portal
              </Heading>
            </Flex>
          </ChakraLink>
        </NextLink>
    </Box>
  );
};

