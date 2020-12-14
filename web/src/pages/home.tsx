import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Nav, Wrapper, Footer } from "../components/partials";
import { NonAuthRoutes } from "../api/routes";
import { useHistory } from "react-router-dom";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  let history = useHistory();
  return (
    <Box position="relative" minHeight="100vh">
      <Nav hidden={false} />
      <Wrapper>
        <Box md="70px">
          <Box textAlign="center" height="100%">
            <Heading size="2xl">Welcome to Money Portal</Heading>
            <Text mt={2} fontSize="xl">
              Manage your finances with ease
            </Text>
            <Flex
              mt={4}
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center"
            >
              <Button onClick={() => history.push(NonAuthRoutes.LOGIN)}>
                Login
              </Button>
              <Button
                ml={4}
                onClick={() => {
                  history.push(NonAuthRoutes.REGISTER);
                }}
              >
                {" "}
                Register
              </Button>
            </Flex>
          </Box>
        </Box>
      </Wrapper>
      <Footer />
    </Box>
  );
};
