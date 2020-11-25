import React from "react";
import { ModalFooter, ModalBody, Button } from "@chakra-ui/react";
import { InputField } from "../common";
import { SelectField } from "../common";
import { Formik, Form } from "formik";

interface Props {
  onClose: any;
}

const accountOptions = [
  { id: 1, value: "Checking" },
  { id: 2, value: "Savings" },
  { id: 3, value: "Credit" },
];

export const AddAccountForm: React.FC<Props> = ({ onClose }) => {
  return (
    <Formik
      initialValues={{
        accountName: "",
        accountType: "",
        startingBalance: "",
        lowBalanceAlert: "",
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
          <ModalBody pb={6}>
            <InputField
              name="accountName"
              type="text"
              label="Account Name"
              placeholder="Enter Account Name"
            />
            <SelectField
              name="accountType"
              label="Account Type"
              defaultOption="Select Account Type"
              selectOptions={accountOptions}
            />
            <InputField
              name="startingBalance"
              type="number"
              label="Starting Balance"
              placeholder="Enter Starting Balance"
            />
            <InputField
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
};
