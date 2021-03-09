import * as React from 'react';
import {
  Flex,
  Icon,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  List,
  AccordionPanel,
  useDisclosure,
  AccordionIcon,
  Text
} from '@chakra-ui/react'
import { MdAccountBalanceWallet } from 'react-icons/md';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import { EditAccountModal, DeleteAccountModal } from '../';
import { ManageItem } from './';

interface Props {
  color: string;
  hColor: string;
  textColor: string;
  hBg: string;
  borderColor: string;
  listBg: string;
  itemBg: string;
}

export const ManageAccount: React.FC<Props> = ({
  color,
  hColor,
  textColor,
  hBg,
  listBg,
  borderColor,
  itemBg
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    onOpen: EditOpen,
    onClose: EditClose,
    isOpen: EditIsOpen,
  } = useDisclosure();
  const {
    onOpen: DeleteOpen,
    onClose: DeleteClose,
    isOpen: DeleteIsOpen,
  } = useDisclosure();

  const manageButton = (
    <AccordionButton onClick={() => setIsOpen(!isOpen)}>
      <Box flex="1" textAlign="left">
        <Flex
          color={color}
          _hover={{
            bg: hBg,
            color: hColor
          }}
          bg={isOpen ? hBg: ""}
          padding="1.5rem 2rem"
          flexWrap='wrap'
          alignItems='center'
        >
          <Icon textStyle="iconWrap" as={MdAccountBalanceWallet} />
          <Text color={textColor}>
            Manage
          </Text>
          <AccordionIcon ml="auto" />
        </Flex>
      </Box>
    </AccordionButton>
  )

  const editAccount  = (
    <ManageItem
      borderColor={borderColor}
      isOpen={EditIsOpen}
      color={color}
      hColor={hColor}
      itemBg={itemBg}
      textColor={textColor}
      onOpen={EditOpen}
      name="Edit Account"
    >
      <Icon textStyle="iconWrapAlt" as={FaRegEdit} />
    </ManageItem>
  )

  const deleteAccount = (
    <ManageItem
      borderColor={borderColor}
      isOpen={DeleteIsOpen}
      color={color}
      hColor={hColor}
      itemBg={itemBg}
      textColor={textColor}
      onOpen={DeleteOpen}
      name="Delete Account"
    >
      <Icon textStyle="iconWrapAlt" as={FaTrashAlt} />
    </ManageItem>
  )

  return(
    <>
      <EditAccountModal isOpen={EditIsOpen} onClose={EditClose} />
      <DeleteAccountModal isOpen={DeleteIsOpen} onClose={DeleteClose} />
      <Accordion allowToggle>
        <AccordionItem borderBottom="0" borderTop="0" >
          {manageButton}
          <AccordionPanel bg={listBg} p="0 0 1em 0">
            <List mt={0} maxHeight="none">
              {editAccount}
              {deleteAccount}
            </List>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>

  );
}
