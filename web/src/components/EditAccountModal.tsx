import { WarningTwoIcon } from "@chakra-ui/icons";
import {
  ModalBody,
  ModalFooter,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Box,
  Text,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { InputField, SelectField } from ".";
import { accountOptions } from "../constants";
import {
  useBankAccountQuery,
  useUpdateBankAccountMutation,
} from "../generated/graphql";
import { useGetIntId } from "../utils/useGetIntId";

interface EditAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditAccountModal: React.FC<EditAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [updateBankAccount] = useUpdateBankAccountMutation();
  const intId = useGetIntId();
  let history = useHistory();
  const { data, loading } = useBankAccountQuery({
    variables: {
      id: intId,
    },
  });
  console.log(data);

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
        <Box mt={4}>
          <WarningTwoIcon w="6rem" h="6rem" color="red.500" />
        </Box>
        <Text fontSize="lg" mt={4}>
          could not find account
        </Text>
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
        onSubmit={async (values) => {
          console.log(values);
          const { errors } = await updateBankAccount({
            variables: {
              id: intId,
              ...values,
            },
          });
          if (!errors) {
            history.goBack();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <ModalBody pb={4}>
              <InputField
                name="name"
                type="text"
                label="Account Name"
                placeholder="Enter Account Name"
              />
              {data.bankAccount ? (
                <SelectField
                  name="type"
                  label="Account Type"
                  value={data.bankAccount.type}
                  selectOptions={accountOptions}
                />
              ) : (
                <SelectField
                  name="type"
                  label="Account Type"
                  selectOptions={accountOptions}
                />
              )}
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
                Update
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    );
  }

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Bank Account</ModalHeader>
        <ModalCloseButton />
        {body}
      </ModalContent>
    </Modal>
  );
};
