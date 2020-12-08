import * as React from "react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { FormikInputField } from "../components";
import { Box, Button, Link as ChakraLink, Flex } from "@chakra-ui/react";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthRoutes } from "../api/routes";

interface loginProps {}

export const Login: React.FC<loginProps> = () => {
  const [login] = useLoginMutation();

  let history = useHistory();
  let location: any = useLocation();

  let { from } = location.state || { from: { pathname: AuthRoutes.DASHBOARD } };

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
            history.replace(from);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormikInputField
              name="usernameOrEmail"
              placeholder="Username or Email"
              label="Username or Email"
            />
            <Box mt={4}>
              <FormikInputField
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
