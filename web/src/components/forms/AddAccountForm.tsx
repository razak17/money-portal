import React from "react";
import { ModalFooter, ModalBody, Button } from "@chakra-ui/react";
import { InputField } from "../InputField";
import { SelectField } from "../SelectField";
import { Formik, Form } from "formik";

interface Props {
  onClose: any;
}

const selectOptions = ["Checking", "Savings", "Credit"];

export const AddAccountForm: React.FC<Props> = ({ onClose }) => {
  return (
    <Formik
      initialValues={{
        accountName: "hello",
        accountType: "",
        startingBalance: "hello",
        lowBalanceAlert: "hello",
      }}
      onSubmit={async (values, actions) => {
        setTimeout(() => {
          console.log({ values, actions });
          console.log(values);
          actions.setSubmitting(false);
        }, 4000);
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
              selectOptions={selectOptions}
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
