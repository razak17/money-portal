import * as React from 'react';
import {
  Link as ChakraLink,
  ListItem,
  Flex,
  Icon,
  Text
} from '@chakra-ui/react'
import { useRouter } from "next/router";
import { MdSettings } from 'react-icons/md';
import { AuthRoutes } from '../../api/routes'
import NextLink from 'next/link';

interface Props {
  color: string;
  hBg: string;
  hColor: string;
  textColor: string;
  borderColor: string;
}

export const AccountSettings: React.FC<Props> = ({color, hBg, hColor, textColor, borderColor}) => {
  const router = useRouter();

  return(
    <ListItem
      fontSize="sm"
      position="relative"
      bg={router.pathname === AuthRoutes.SETTINGS ? hBg: ""}
      borderLeft={router.pathname === AuthRoutes.SETTINGS  ? borderColor : ""}
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
