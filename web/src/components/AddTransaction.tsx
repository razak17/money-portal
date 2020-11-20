import {
  Stack,
  Box,
  Flex,
  Heading,
  SelectField,
  Button,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "./common";

interface AddTransactionProps {}

const selectOptions = ["Checking", "Savings", "Credit"];

export const AddTransaction: React.FC<AddTransactionProps> = () => {
  return (
    <Stack spacing={8}>
      <Box bg="yellow.200" shadow="md" textAlign="left" padding="20px">
        <Flex m={0}>
          <Heading size="md">Add Transaction</Heading>
          <Box ml="auto">X</Box>
        </Flex>
        <Box mt={2}>
          <Flex flexWrap="wrap">
            <Formik
              initialValues={{
                accountName: "",
                accountType: "",
              }}
              onSubmit={async (values, actions) => {
                setTimeout(() => {
                  console.log({ values, actions });
                  actions.setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    name="accountName"
                    type="text"
                    label="Account Name"
                    placeholder="Enter Account Name"
                  />
                  <SelectField
                    name="accountType"
                    label="Account Type"
                    selectOptions={selectOptions}
                  />
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    colorScheme="blue"
                    mr={3}
                  >
                    Save
                  </Button>
                  <Button onClick={() => {}}>Cancel</Button>
                </Form>
              )}
            </Formik>
          </Flex>
        </Box>
      </Box>
    </Stack>
  );
};
