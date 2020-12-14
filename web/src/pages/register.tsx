import * as React from "react";
import { Formik, Form } from "formik";
import { Wrapper, FormikInputField } from "../components/partials";
import { Box, Button, Link as ChakraLink, Flex } from "@chakra-ui/react";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { Link, useHistory } from "react-router-dom";
import { AuthRoutes, NonAuthRoutes } from "../api/routes";

interface registerProps {}

export const Register: React.FC<registerProps> = () => {
  let history = useHistory();
  const [register] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          /* console.log(values); */
          const response = await register({
            variables: {
              options: values,
            },
          });
          console.log(response.data);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            history.push(AuthRoutes.DASHBOARD);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormikInputField
              name="username"
              placeholder="Username"
              label="Username"
            />
            <FormikInputField name="email" placeholder="Email" label="Email" />
            <Box mt={4}>
              <FormikInputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex mt={2}>
              <ChakraLink
                as={Link}
                to={NonAuthRoutes.FORGOT_PASSWORD}
                mr="auto"
              >
                forgot password?
              </ChakraLink>
              <ChakraLink as={Link} to={NonAuthRoutes.LOGIN} ml="auto">
                already registered?
              </ChakraLink>
            </Flex>
            <Flex mt={4}>
              <Button
                ml="auto"
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
