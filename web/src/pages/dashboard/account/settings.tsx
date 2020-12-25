import * as React from 'react';
import { withApollo } from '../../../utils';
import { Layout, PageHeader, InputField } from '../../../components';
import { useRouter } from "next/router";
import { Box, Heading, Flex, Button, useColorModeValue } from '@chakra-ui/react';
import { useFormik } from 'formik';

const Settings = () => {
  const router = useRouter();
  const bg = useColorModeValue("gray.50", "brandDark.700")
  console.log('AAAA', router);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: ""
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
      return;
    }
  })

  const { getFieldProps, handleSubmit, isSubmitting, errors } = formik;

  const personal = (
    <Box
      flex="0 0 auto"
      p="1em"
      w="50%"
    >
      <Flex
        bg={bg}
        position="relative"
        borderWidth="1px"
        borderRadius="md"
        shadow="xs"
      >
        <Box flex="1 1 auto" p="1.5em 1em">
          <Box mb="2em">
            <Heading size="sm">Personal details</Heading>
          </Box>
          <Box width="60%">
            <Box mt="1.5rem">
              <InputField
                label="First Name"
                placeholder="First Name"
                {...getFieldProps("firstName")}
                name="firstName"
                error={errors.firstName}
              />
            </Box>
            <Box mt="1.5rem">
              <InputField
                label="Last Name"
                placeholder="Last Name"
                {...getFieldProps("lastName")}
                name="firstName"
                error={errors.lastName}
              />
            </Box>
            <Box mt="1.5rem">
              <InputField
                label="Username"
                placeholder="Username"
                {...getFieldProps("username")}
                name="username"
                error={errors.firstName}
              />
            </Box>
            <Box mt="1.5rem">
              <InputField
                type="email"
                label="Email"
                placeholder="Email"
                {...getFieldProps("email")}
                name="firstName"
                error={errors.email}
              />
            </Box>
            <Flex mt="1rem">
              <Box ml="auto">
                <Button
                  ml="auto"
                  size="xs"
                  onClick={() => handleSubmit()}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Update
                </Button>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  )

  return (
    <Layout>
      <PageHeader heading="Settings" />
        <Flex flexWrap="wrap" alignItems="center" p="0 0.5em" mb="1em">
          {personal}
          <Box
            flex="0 0 auto"
            p="1em"
            w="30%"
          >
            <Flex
              bg={bg}
              position="relative"
              borderWidth="1px"
              borderRadius="md"
              shadow="xs"
            >
              <Box flex="1 1 auto" p="1.5em 1em">
                <Heading size="sm">Account Options</Heading>
                <Box mt="0.5rem">
                  stuff
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>
    </Layout>
  )
}

export default withApollo({ ssr: false })(Settings);

