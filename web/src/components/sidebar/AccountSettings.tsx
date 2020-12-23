import * as React from 'react';
import {
  Link as ChakraLink,
  ListItem,
  Flex,
  Icon,
  Text
} from '@chakra-ui/react'
import { MdSettings } from 'react-icons/md';
import { AuthRoutes } from '../../api/routes'
import NextLink from 'next/link';

interface Props {
  color: string;
  hBg: string;
  hColor: string;
  textColor: string;
}

export const AccountSettings: React.FC<Props> = ({color, hBg, hColor, textColor}) => {
  return(
    <ListItem
      fontSize="sm"
      position="relative"
    >
      <NextLink href={AuthRoutes.SETTINGS}>
        <ChakraLink display="block" position="relative">
          <Flex
            color={color}
            _hover={{
              bg: hBg,
              color: hColor
            }}
            padding="1.5rem 2rem"
            flexWrap='wrap'
            alignItems='center'
          >
            <Icon
              textStyle="iconWrap"
              as={MdSettings}
            />
            <Text color={textColor}>
              Settings
            </Text>
          </Flex>
        </ChakraLink>
      </NextLink>
    </ListItem>

  );
}
