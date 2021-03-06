import {
  ModalBody,
  ModalFooter,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as React from "react";
import { FormikInputField, FormikSelectField } from "./partials";
import { accountOptions } from "../types";
import { useGetIntId } from "../utils/useGetIntId";
import {
  useBankAccountQuery,
  useUpdateBankAccountMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { updateBankAccountSchema } from "../utils/validate";

interface EditAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditAccountModal: React.FC<EditAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const initialRef = React.useRef<HTMLInputElement>(null);

  const intId = useGetIntId();
  const [updateBankAccount] = useUpdateBankAccountMutation();
  const { data, loading } = useBankAccountQuery({
    variables: {
      id: intId,
    },
  });

  let body = null;
  if (loading) {
    body = (
      <Box textAlign="center" p={4}>
        loading...
      </Box>
    );
  } else if (!data?.bankAccount) {
    body = (
      <Box textAlign="center" p={4}>
        Not Found
      </Box>
    );
  } else {
    body = (
      <Formik
        initialValues={{
          name: data?.bankAccount.name,
          type: data?.bankAccount.type,
          lowBalanceAlert: data?.bankAccount.lowBalanceAlert,
        }}
        validationSchema={updateBankAccountSchema}
        onSubmit={async (values, { setErrors }) => {
          /* console.log(values); */
          const response = await updateBankAccount({
            variables: {
              id: intId,
              ...values,
            },
            update: (cache) => {
              cache.evict({ fieldName: "bankAccount" });
              cache.gc();
            },
          });
          /* console.log(response); */
          if (response.data?.updateBankAccount.errors) {
            setErrors(toErrorMap(response.data.updateBankAccount.errors));
          } else {
            onClose();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <ModalBody pb={4}>
              <FormikInputField
                name="name"
                type="text"
                label="Account Name"
                placeholder="Enter Account Name"
                elementRef={initialRef}
              />
              {data.bankAccount ? (
                <FormikSelectField
                  name="type"
                  label="Account Type"
                  selectOptions={accountOptions}
                />
              ) : (
                <FormikSelectField
                  name="type"
                  label="Account Type"
                  selectOptions={accountOptions}
                />
              )}
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
                Update
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    );
  }

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
