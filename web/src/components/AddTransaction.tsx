import { Box, Flex, Heading, Button, HStack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { InputField, SelectField } from "./common";

interface AddTransactionProps {}

const transactionOptions = [
  "Cash Withdrawal",
  "Check",
  "Deposit",
  "Point of Sale",
  "Transfer",
];

export const AddTransaction: React.FC<AddTransactionProps> = () => {
  const heading = (
    <Flex m={0}>
      <Heading size="md">Add Transaction</Heading>
      <Box ml="auto" cursor="pointer" onClick={() => console.log("close")}>
        <Heading size="md">x</Heading>
      </Box>
    </Flex>
  );

  const form = (
    <Formik
      initialValues={{
        amount: "",
        transactionType: "",
        memo: "",
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
          <Flex mr={0} ml={0} flexWrap="wrap">
            <Box p="0 1.5rem 0 0" flex="0 0 20%" maxWidth="20%">
              <InputField name="amount" type="number" label="Amount" />
            </Box>
            <Box p="0 1.5rem 0 0" flex="0 0 20%" maxWidth="20%">
              <SelectField
                name="transactionType"
                label="Transaction Type"
                defaultOption="Select Transaction Type"
                selectOptions={transactionOptions}
              />
            </Box>
            <Box p="0 1.5rem 0 0" flex="0 0 50%" maxWidth="50%">
              <InputField name="memo" type="text" label="Memo" />
            </Box>
            <Box
              p="0"
              ml="auto"
              flex="0 0 auto"
              width="auto"
              alignSelf="flex-end"
              maxWidth="100%"
            >
              <Button type="submit" isLoading={isSubmitting} shadow="md">
                Add
              </Button>
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );

  return (
    <Box padding="0 2rem" marginBottom="2rem">
      <HStack spacing={8}>
        <Box
          p={5}
          maxWidth="100%"
          shadow="md"
          borderWidth="1px"
          flex="1"
          borderRadius="md"
        >
          {heading}
          <Box mt="0.5rem">{form}</Box>
        </Box>
      </HStack>
    </Box>
  );
};
