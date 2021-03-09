import * as React from 'react';
import { withApollo } from '../../../utils';
import { Layout, PageHeader, InputField, UpdateProfileForm } from '../../../components';
import { useRouter } from "next/router";
import { Box, Heading, Flex, Button, useColorModeValue } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useUpdateProfileMutation, useMeQuery } from '../../../generated/graphql';

const Settings = () => {
  const router = useRouter();
  const bg = useColorModeValue("gray.50", "brandDark.700")
  const meData = useMeQuery();
  console.log('AAAA', meData);

  return (
    <Layout>
      <PageHeader heading="Settings" />
        <Flex flexWrap="wrap" alignItems="center" p="0 0.5em" mb="1em">
          <Box
            flex="0 0 auto"
            p="1em"
            w="70%"
          >
            <Flex
              bg={bg}
              position="relative"
              borderWidth="1px"
              borderRadius="md"
              shadow="xs"
            >
              <Box flex="1 1 auto" p="1.5em 1em">
                <Box mb="2em" p="0 0.5em">
                  <Heading size="sm">Personal details</Heading>
                </Box>
                <UpdateProfileForm />
              </Box>
            </Flex>
          </Box>

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

