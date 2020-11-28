import * as React from "react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components";
import { Box, Button, Link as ChakraLink, Flex } from "@chakra-ui/react";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { Link, useHistory } from "react-router-dom";

interface loginProps {}

export const Login: React.FC<loginProps> = () => {
  let history = useHistory();
  const [login] = useLoginMutation();
  // const [{ data: meData }] = useMeQuery();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "zak", password: "zak" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await login({
            variables: values,
          });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            history.push("/dashboard/lobby");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="Username or Email"
              label="Username or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex mt={2}>
              <ChakraLink as={Link} to="/forgot-password" ml="auto">
                forgot password?
              </ChakraLink>
            </Flex>
            <Box mt={4}>
              <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                Login
              </Button>
            </Box>
            <br />
            <Flex mt={2}>
              <ChakraLink as={Link} to="/register" mr="auto">
                new user?
              </ChakraLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
