import * as React from 'react';
import {
  Link as ChakraLink,
  ListItem,
  Flex,
  Icon,
} from '@chakra-ui/react'
import { MdSettings } from 'react-icons/md';
import { AuthRoutes } from '../../api/routes'
import NextLink from 'next/link';

interface Props {
  color: any;

}

export const AccountSettings: React.FC<Props> = ({color}) => {
  return(
    <ListItem
      fontSize={12} position="relative">
      <NextLink href={AuthRoutes.SETTINGS}>
        <ChakraLink display="block" position="relative" padding="1.5rem 2rem">
          <Flex flexWrap='wrap' alignItems='center'>
            <Icon
              color={color}
              textStyle="iconWrap"
              as={MdSettings}
            />
            Settings
          </Flex>
        </ChakraLink>
      </NextLink>
    </ListItem>

  );
}
