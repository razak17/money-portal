import * as React from 'react'
import {
  Link as ChakraLink,
  List,
  ListItem,
  Flex,
  Icon,
  Text,
  Box,
  Heading,
  useColorModeValue
} from '@chakra-ui/react'
import { useRouter } from "next/router";
import { AccountSettings, Logo, ManageAccount, BankAccounts, SideBarWrapper } from './sidebar'
import { AuthRoutes } from '../api/routes'
import NextLink from 'next/link'
import { FaHome } from 'react-icons/fa'
import { useGetIntId } from '../utils';

interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = () => {
  const intId = useGetIntId();
  const router = useRouter();

  const color = useColorModeValue("brandBlue.500", "brandGray.300")
  const hBg = useColorModeValue("brandBlue.100", "brandDark.100")
  const listBg = useColorModeValue("gray.100", "brandDark.500")
  const itemBg = useColorModeValue("gray.200", "brandDark.600")
  const hColor = useColorModeValue("brandBlue.300", "brandGreen.500")
  const textColor = useColorModeValue("brandBlue.700", "brandGray.300")
  const textColorActive = useColorModeValue("brandBlue.500", "brandGray.100")
  const borderColor = useColorModeValue("2px solid #57618e", "2px solid #418e43");

  const lobby = (
    <ListItem
      fontSize="sm"
      position="relative"
      bg={router.pathname === AuthRoutes.DASHBOARD ? hBg: ""}
      borderLeft={router.pathname === AuthRoutes.DASHBOARD  ? borderColor : ""}
    >
      <NextLink href={AuthRoutes.DASHBOARD}>
        <ChakraLink
          display="block"
          position="relative"
        >
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
              as={FaHome}
            />
            <Text color={textColor}>
              Lobby
            </Text>
          </Flex>
        </ChakraLink>
      </NextLink>
    </ListItem>
  )

  return (
    <SideBarWrapper>
      <Logo />
      <Box mb="1em" mt="1em" ml="2em">
        <Heading color="brandGray.500" size="sm">Personal Account</Heading>
      </Box>
      <List maxHeight="none" mt={0} mb="2em">
        {lobby}
        <BankAccounts
          listBg={listBg}
          itemBg={itemBg}
          intId={intId}
          color={color}
          colorActive={hColor}
          hColor={hColor}
          textColor={textColor}
          textColorActive={textColorActive}
          hBg={hBg}
          borderColor={borderColor}
        />
        {router.pathname != AuthRoutes.DASHBOARD ? (
          <>
            <ManageAccount
              itemBg={itemBg}
              listBg={listBg}
              color={color}
              hColor={hColor}
              textColor={textColor}
              hBg={hBg}
              borderColor={borderColor}
            />
            <AccountSettings
              borderColor={borderColor}
              hBg={hBg}
              hColor={hColor}
              color={color}
              textColor={textColor}
            />
          </>
        ) : null}
      </List>
    </SideBarWrapper>
  )
}
