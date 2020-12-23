import * as React from "react";
import { useColorModeValue, Box, Heading, Flex, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { NonAuthRoutes } from '../../api/routes';
import { BORDER_BG_LIGHT, BORDER_BG_DARK } from '../../constants';

interface Props {}

export const Logo: React.FC<Props> = () => {
  const borderBg = useColorModeValue(BORDER_BG_LIGHT, BORDER_BG_DARK);
  const bBg = useColorModeValue("brandBlue.50", "brandDark.600");
  return (
    <Box position="relative" borderBottom={borderBg} _hover={{bg: bBg}}>
      <NextLink href={NonAuthRoutes.HOME}>
        <ChakraLink>
          <Flex
            p="2rem"
            flexWrap="wrap"
            letterSpacing="0.1em"
            textTransform="uppercase"
            alignItems="center"
          >
            <Heading color="green.400" size="sm">Money</Heading>
            <Heading size="sm">
              Portal
            </Heading>
          </Flex>
        </ChakraLink>
      </NextLink>
    </Box>
  );
};

