import * as React from 'react';
import {
  Link as ChakraLink,
  List,
  ListItem,
  AccordionPanel,
} from '@chakra-ui/react'

interface Props {
  name: string;
  onOpen: () => void;
}

export const SideItem: React.FC<Props> = ({ children, name, onOpen }) => {
  return(
    <AccordionPanel p="0 0 1em 0">
      <List mt={0} maxHeight="none">
        <ListItem fontSize={12} position="relative">
          <ChakraLink
            onClick={onOpen}
            display="block"
            position="relative"
            padding="1.5em 0 1.5em 5.5em"
          >
            {children}
            {name}
          </ChakraLink>
        </ListItem>
      </List>
    </AccordionPanel>
  );
}
