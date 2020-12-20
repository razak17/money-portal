import * as React from 'react';
import { useColorModeValue, Box, Flex, Heading } from "@chakra-ui/react";

interface Props {
  onOpen: any;
  title: string;
}

export const LobbyStack: React.FC<Props> = ({onOpen, title, children}) => {
  const bg = useColorModeValue("gray.50", "brandDark.400")
  return(
    <Box
      cursor="pointer"
      onClick={onOpen}
      flex="0 0 auto"
      p="1em 1.5em"
      w={{ base: "100%", sm: "100%", md: "50%", xl: "33.33%" }}
    >
      <Flex
      bg={bg}
        position="relative"
        borderWidth="1px"
        borderRadius="md"
        shadow="xs"
      >
        <Box flex="1 1 auto" p="1.5em 1em">
          <Flex
            justifyContent="center"
            alignItems="center"
            mb={2}
          >
            <Box
              textAlign="center"
              flex="0 auto"
              w={{ base: "100%", sm: "100%", md: "100%", xl: "100%" }}
              p="0 1em"
            >
              <Heading
                size="sm"
              >
                {title}
              </Heading>
            </Box>
          </Flex>
          {children}
        </Box>
      </Flex>
    </Box>
  );
}
