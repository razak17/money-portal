import React, { useRef } from "react";
import {
  Link as ChakraLink,
  Flex,
  HStack,
  GridItem,
  Box,
  Heading,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddAccountModal } from "./AddAccountModal";

interface Props {}

export const Main: React.FC<Props> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <AddAccountModal isOpen={isOpen} onClose={onClose} />
      <GridItem rowSpan={2} colSpan={2} borderBottom="1px solid black">
        <Flex
          top={0}
          borderTop="1px solid black"
          borderBottom="1px solid black"
          mb={10}
          p={6}
        >
          <Flex flex={1} m="auto" align="center">
            <Box mr={"auto"}>
              <Text mr={2}>Home</Text>
            </Box>
          </Flex>
        </Flex>
        <Box paddingLeft={10} paddingRight={10}>
          <HStack spacing={8}>
            <Box
              padding={3}
              maxWidth="33%"
              shadow="md"
              borderWidth="1px"
              textAlign="center"
              flex={1}
              borderRadius="md"
            >
              <Box>
                <ChakraLink onClick={onOpen}>
                  <Heading fontSize="xl">Add Account</Heading>
                </ChakraLink>
              </Box>
              <Box>
                <Text mt={4}>desc</Text>
              </Box>
            </Box>
          </HStack>
        </Box>
      </GridItem>
    </>
  );
};
