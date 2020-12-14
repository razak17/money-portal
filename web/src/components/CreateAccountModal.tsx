import * as React from "react";
import {
  ModalBody,
  ModalFooter,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { FormikInputField, FormikSelectField } from "./partials";
import { useNewBankAccountMutation } from "../generated/graphql";
import { accountOptions } from "../types";
import { NewBankAccountSchema } from "../utils/validate";
import { useHistory } from "react-router-dom";
import { AuthRoutes } from "../api/routes";
import { toErrorMap } from "../utils/toErrorMap";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateAccountModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const initialRef = React.useRef<HTMLInputElement>(null);
  const history = useHistory();

  const [newBankAccount] = useNewBankAccountMutation();

  let body = null;

  body = (
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
      onSubmit={async (values, { setErrors }) => {
        console.log(values);
        const response = await newBankAccount({
          variables: {
            input: {
              ...values,
              startingBalance: parseFloat(values.startingBalance),
              lowBalanceAlert: parseFloat(values.lowBalanceAlert),
            },
          },
          update: (cache) => {
            cache.evict({ fieldName: "bankAccounts" });
            cache.evict({ fieldName: "totalBankAccounts" });
            cache.gc();
          },
        });
        if (response.data?.newBankAccount.errors) {
          setErrors(toErrorMap(response.data.newBankAccount.errors));
        } else if (response.data?.newBankAccount.bankAccount) {
          onClose();
          history.push(
            `${AuthRoutes.TRANSACTIONS}/${response.data.newBankAccount.bankAccount.id}`
          );
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <ModalBody pb={6}>
            <FormikInputField
              name="name"
              type="text"
              label="Account Name"
              placeholder="Enter Account Name"
              elementRef={initialRef}
            />
            <FormikSelectField
              name="type"
              label="Account Type"
              selectOptions={accountOptions}
            />
            <FormikInputField
              amount
              name="startingBalance"
              type="number"
              label="Starting Balance"
              placeholder="Enter Starting Balance"
            />
            <FormikInputField
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
              Create
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );

  return (
    <Modal
      initialFocusRef={initialRef}
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>{body}</ModalContent>
    </Modal>
  );
};
