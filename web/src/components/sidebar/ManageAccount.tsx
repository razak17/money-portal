import * as React from 'react';
import {
  Flex,
  Icon,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  useDisclosure
} from '@chakra-ui/react'
import { MdAccountBalanceWallet } from 'react-icons/md';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import { EditAccountModal, DeleteAccountModal } from '../';
import { SideItem } from './';

interface Props {
  hBg: any;
  color: any
}

export const ManageAccount: React.FC<Props> = ({ hBg, color }) => {
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

  return(
    <>
      <EditAccountModal isOpen={EditIsOpen} onClose={EditClose} />
      <DeleteAccountModal isOpen={DeleteIsOpen} onClose={DeleteClose} />
      <Accordion allowToggle>
        <AccordionItem borderBottom="0" borderTop="0" >
          <AccordionButton
            _hover={{
              bg: hBg
            }}
            _focus={{
              boxShadow: "none",
            }}
            padding="1.5rem 2rem"
          >
            <Box flex="1" textAlign="left">
              <Flex flexWrap='wrap' alignItems='center'>
                <Icon
                  color={color}
                  textStyle="iconWrap"
                  as={MdAccountBalanceWallet}
                />
                Manage
              </Flex>
            </Box>
          </AccordionButton>
          <SideItem onOpen={EditOpen} name="Edit Account">
            <Icon
              color={color}
              textStyle="iconWrap"
              as={FaRegEdit}
            />
          </SideItem>
          <SideItem onOpen={DeleteOpen} name="Delete Account">
            <Icon
              color={color}
              textStyle="iconWrap"
              as={FaTrashAlt}
            />
          </SideItem>
        </AccordionItem>
      </Accordion>
    </>

  );
}
