import * as React from "react";
import { Formik, Form } from "formik";
import { Wrapper, FormikInputField } from "../components/partials";
import { Box, Button, Link as ChakraLink, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useRegisterMutation, MeQuery, MeDocument } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { AuthRoutes, NonAuthRoutes } from "../api/routes";
import { withApollo } from '../utils/withApollo';

interface registerProps {}

const Register: React.FC<registerProps> = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: {
              options: values,
            },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.register.user,
                },
              });
            }
          });
          console.log(response.data);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push(AuthRoutes.DASHBOARD);
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
              <NextLink href={NonAuthRoutes.FORGOT_PASSWORD}>
                <ChakraLink mr="auto">
                  forgot password?
                </ChakraLink>
              </NextLink>
              <NextLink href={NonAuthRoutes.LOGIN}>
                <ChakraLink ml="auto">
                  already registered?
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
                Register
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Register);
