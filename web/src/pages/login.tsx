import * as React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Link as ChakraLink, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Wrapper, FormikInputField } from "../components/partials";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { AuthRoutes, NonAuthRoutes } from "../api/routes";
import { withApollo } from '../utils/withApollo';

interface loginProps {}

const Login: React.FC<loginProps> = () => {
  const [login] = useLoginMutation();
  const router = useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "zak", password: "zak" }}
        onSubmit={async (values, actions) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.login.user,
                },
              });
            },
          });
          if (response.data?.login.errors) {
            actions.setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
             if (typeof router.query.next === "string") {
               router.push(router.query.next);
             } else {
               router.push(AuthRoutes.DASHBOARD);
             }
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
              <NextLink href={NonAuthRoutes.REGISTER}>
                <ChakraLink mr="auto">
                  new user?
                </ChakraLink>
              </NextLink>
              <NextLink href={NonAuthRoutes.FORGOT_PASSWORD}>
                <ChakraLink ml="auto">
                  forgot password?
                </ChakraLink>
              </NextLink>
            </Flex>
            <Flex mt={4}>
              <Button
                ml="auto"
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Login);
