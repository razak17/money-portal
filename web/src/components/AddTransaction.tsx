import { Box, Flex, Heading, Button, HStack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { InputField, SelectField } from "./common";
import { transactionOptions } from "../types";
import { AddTransactionSchema } from "../utils/validate";
import { useNewTransactionMutation } from "../generated/graphql";
import { useGetIntId } from "../utils/useGetIntId";

interface AddTransactionProps {}

export const AddTransaction: React.FC<AddTransactionProps> = () => {
  const intId = useGetIntId();
  const [newTransaction] = useNewTransactionMutation();

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
        type: transactionOptions[0],
        memo: "",
      }}
      validationSchema={AddTransactionSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={async (values, actions) => {
        console.log("hello", values);
        const { errors } = await newTransaction({
          variables: {
            input: {
              ...values,
              amount: parseInt(values.amount),
            },
            bankAccountId: intId,
          },
          update: (cache) => {
            cache.evict({ fieldName: "transactions:{}" });
            cache.gc();
          },
        });
        if (!errors) {
          actions.resetForm();
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex mr={0} ml={0} flexWrap="wrap">
            <Box p="0 1.5rem 0 0" flex="0 0 20%" maxW="20%">
              <InputField name="amount" type="number" label="Amount" />
            </Box>
            <Box p="0 1.5rem 0 0" flex="0 0 20%" maxWidth="20%">
              <SelectField
                name="type"
                label="Transaction Type"
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
              maxW="100%"
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
    <Box padding="1rem 2rem" mb="1rem">
      <HStack spacing={8}>
        <Box
          p={5}
          maxW="100%"
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
