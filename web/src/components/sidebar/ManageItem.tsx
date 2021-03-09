import * as React from 'react';
import {
  Link as ChakraLink,
  ListItem,
  Text,
  Flex,
} from '@chakra-ui/react'

interface Props {
  name: string;
  onOpen: () => void;
  textColor: string;
  hColor: string;
  color: string;
  itemBg: string;
  isOpen: boolean;
  borderColor: string;
}

export const ManageItem: React.FC<Props> = ({
  children,
  name,
  onOpen,
  textColor,
  color,
  hColor,
  itemBg,
  isOpen,
  borderColor
}) => {
  return(
    <ListItem
      bg={isOpen ? itemBg: ""}
      borderLeft={isOpen ? borderColor : ""}
      fontSize="sm"
      position="relative"
    >
      <ChakraLink
        onClick={onOpen}
        display="block"
        position="relative"
      >
        <Flex
          padding="1.5em 0 1.5em 5.5em"
          flexWrap="wrap"
          color={color}
          _hover={{
            color: hColor,
            bg: itemBg
          }}
        >
          {children}
          <Text color={textColor}>
            {name}
          </Text>
        </Flex>
      </ChakraLink>
    </ListItem>
  );
}
