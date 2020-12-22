import * as React from 'react'
import {
  Link as ChakraLink,
  List,
  ListItem,
  Flex,
  Icon,
  useColorModeValue
} from '@chakra-ui/react'
import { AccountSettings, Logo, ManageAccount, BankAccounts, Header, SideBarWrapper } from './sidebar'
import { AuthRoutes } from '../api/routes'
import NextLink from 'next/link'
import { FaHome } from 'react-icons/fa'
import { useGetIntId } from '../utils';

interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = () => {
  const color = useColorModeValue("brandBlue.500", "green.500")
  const hBg = useColorModeValue("brandBlue.50", "brandDark.100")
  const intId = useGetIntId();

  const personal = (
    <List maxHeight="none" mt={0} mb="2em">
      <ListItem
        fontSize={12}
        position="relative"
        bg={intId === -1 ? hBg: ""}
      >
        <NextLink href={AuthRoutes.DASHBOARD}>
            <ChakraLink
              textDecoration='none'
              display="block"
              position="relative"
              padding="1.5rem 2rem"
            >
              <Flex flexWrap='wrap' alignItems='center'>
                <Icon
                  color={color}
                  textStyle="iconWrap"
                  as={FaHome}
                />
                Lobby
              </Flex>
            </ChakraLink>
        </NextLink>
      </ListItem>
      <BankAccounts />
    </List>
  )

  return (
    <SideBarWrapper>
      <Logo />
      <Header text="Personal Account" />
      {personal}
      {intId !== -1 ? (
        <>
          <Header text="My Account" />
          <List maxHeight="none" mt={0} mb="1rem">
            <ManageAccount hBg={hBg} color={color} />
            <AccountSettings color={color} />
          </List>
        </>
      ) : null}
    </SideBarWrapper>
  )
}
