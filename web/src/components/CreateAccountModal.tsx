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
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { accountOptions, BankAccount } from "../constants";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NewBankAccountSchema: Yup.ObjectSchema<BankAccount> = Yup.object({
  name: Yup.string()
    .min(2, "Must be at least two charaters long.")
    .required("Please enter account name."),
  type: Yup.string().required("Please select account type."),
  startingBalance: Yup.number()
    .min(0, "Must be greater than 0.")
    .required("Please enter a number."),
  lowBalanceAlert: Yup.number()
    .max(
      Yup.ref("startingBalance"),
      "Must not be greater than starting balance"
    )
    .required("Please Enter a number."),
});

export const CreateAccountModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [newBankAccount] = useNewBankAccountMutation();
  let history = useHistory();

  const form = (
    <Formik
      initialValues={{
        name: "",
        type: "",
        startingBalance: 0,
        lowBalanceAlert: 0,
      }}
      validationSchema={NewBankAccountSchema}
      onSubmit={async (values, actions) => {
        console.log(values);
        const { errors } = await newBankAccount({
          variables: {
            input: values,
          },
        });
        if (!errors) {
          history.push("/dashboard/lobby");
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
