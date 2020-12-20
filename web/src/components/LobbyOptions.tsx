import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { LobbyStack } from './partials';
import { FaHome, FaDoorOpen, FaUniversity } from 'react-icons/fa'

interface LobbyOptionsProps {
  onOpen: any;
}

export const LobbyOptions: React.FC<LobbyOptionsProps> = ({ onOpen }) => {
  const color = useColorModeValue("brandBlue.600", "green.500")

  return (
    <Flex flexWrap="wrap" alignItems="center"  padding="0 0.5em" mb="1em">
      <LobbyStack
        title="Create Household"
        onOpen={onOpen}
      >
        <Flex justifyContent="center">
          <Icon
            color={color}
            textStyle="iconWrapLarge"
            as={FaHome}
          />
        </Flex>
      </LobbyStack>
      <LobbyStack
        title="Join Household"
        onOpen={onOpen}
      >
        <Flex justifyContent="center">
          <Icon
            color={color}
            textStyle="iconWrapLarge"
            as={FaDoorOpen}
          />
        </Flex>
      </LobbyStack>
      <LobbyStack
        title="Add Bank Account"
        onOpen={onOpen}
      >
        <Flex justifyContent="center">
          <Icon
            color={color}
            textStyle="iconWrapLarge"
            as={FaUniversity}
          />
        </Flex>
    </LobbyStack>
  </Flex>
  );
};
