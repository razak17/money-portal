import * as React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

interface Props {}

export const NotAuthenticatedModal: React.FC<Props> = () => {
  const history = useHistory();
  return (
    <Box textAlign="center" p={8}>
      <Box mt={4}>
        <WarningTwoIcon w="6rem" h="6rem" color="red.500" />
      </Box>
      <Text fontSize="lg" mt={4}>
        You are not logged in.
      </Text>
      <Box mt={8}>
        <Button
          mr={4}
          onClick={() => {
            history.push("/login");
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            history.push("/register");
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};
