import * as React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Button,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField, SelectField } from ".";
import { useNewBankAccountMutation } from "../generated/graphql";
import { accountOptions } from "../types";
import { NewBankAccountSchema } from "../utils/validate";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateAccountModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [newBankAccount] = useNewBankAccountMutation();

  const form = (
    <Formik
      initialValues={{
        name: "",
        type: accountOptions[0],
        startingBalance: "",
        lowBalanceAlert: "",
      }}
      validationSchema={NewBankAccountSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={async (values, actions) => {
        console.log(values);
        const { errors } = await newBankAccount({
          variables: {
            input: {
              ...values,
              startingBalance: parseInt(values.startingBalance),
              lowBalanceAlert: parseInt(values.lowBalanceAlert),
            },
          },
          update: (cache) => {
            cache.evict({ fieldName: "bankAccounts: {}" });
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
          <ModalBody pb={6}>
            <InputField
              name="name"
              type="text"
              label="Account Name"
              placeholder="Enter Account Name"
            />
            <SelectField
              name="type"
              label="Account Type"
              selectOptions={accountOptions}
            />
            <InputField
              amount
              name="startingBalance"
              type="number"
              label="Starting Balance"
              placeholder="Enter Starting Balance"
            />
            <InputField
              amount
              type="number"
              name="lowBalanceAlert"
              label="Low Balance Alert"
              placeholder="Enter Low Balance Alert"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              isLoading={isSubmitting}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Bank Account</ModalHeader>
        <ModalCloseButton />
        {form}
      </ModalContent>
    </Modal>
  );
};
