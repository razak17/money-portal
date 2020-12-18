import * as React from 'react'
import {
  Link as ChakraLink,
  List,
  ListItem,
  Text,
  Icon
} from '@chakra-ui/react'
import { BankAccounts, Header, SideBarWrapper, Logo } from './sidebar'
import { AuthRoutes } from '../api/routes'
import NextLink from 'next/link'
import { useGetIntId } from '../utils'
import { FaHome } from 'react-icons/fa'

interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = () => {
  const intId = useGetIntId()

  const personal = (
    <List maxHeight="none" mt={0} mb="2em">
      <ListItem fontSize={12} position="relative">
        <Icon as={FaHome} />
        <NextLink href={AuthRoutes.DASHBOARD}>
          <ChakraLink display="block" position="relative" padding="1.5rem 2rem">
            <Text>Home</Text>
          </ChakraLink>
        </NextLink>
      </ListItem>
      <BankAccounts />
    </List>
  )

  const manage = (
    <List maxHeight="none" mt={0} mb="1rem">
      <ListItem fontSize={12} position="relative">
        <NextLink
          href={`${AuthRoutes.ACCOUNT_DETAILS}/[id]`}
          as={`${AuthRoutes.ACCOUNT_DETAILS}/${intId}`}
        >
          <ChakraLink display="block" position="relative" padding="1.5rem 2rem">
            <Text>Account</Text>
          </ChakraLink>
        </NextLink>
      </ListItem>
      <ListItem fontSize={12} position="relative">
        <NextLink href={AuthRoutes.SETTINGS}>
          <ChakraLink display="block" position="relative" padding="1.5rem 2rem">
            <Text>Settings</Text>
          </ChakraLink>
        </NextLink>
      </ListItem>
    </List>
  )

  return (
    <SideBarWrapper>
      <Logo />
      <Header text="Personal Account" />
      {personal}
      <Header text="My Account" />
      {manage}
    </SideBarWrapper>
  )
}
