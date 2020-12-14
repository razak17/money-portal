import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FormikInputField } from "./partials";
import * as React from "react";
import { Form, Formik } from "formik";
import { useGetIntId } from "../utils/useGetIntId";
import { useDeleteBankAccountMutation } from "../generated/graphql";
import { useHistory } from "react-router-dom";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const intId = useGetIntId();
  const initialRef = React.useRef<HTMLInputElement>(null);

  const [deleteBankAccount] = useDeleteBankAccountMutation();

  let history = useHistory();

  let body = null;
  body = (
    <Formik
      initialValues={{ deleteAccount: "DELETE" }}
      onSubmit={async (values) => {
        console.log(values);
        if (values.deleteAccount === "DELETE") {
          const { errors } = await deleteBankAccount({
            variables: {
              id: intId,
            },
            update: (cache) => {
              cache.evict({ fieldName: "bankAccounts" });
              cache.evict({ fieldName: "totalBankAccounts" });
              // cache.gc();
            },
          });
          if (!errors) {
            history.push("/dashboard/lobby");
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box mt={4} textAlign="center" p={4}>
            <InfoOutlineIcon w="6rem" h="6rem" color="red.500" />
          </Box>
          <ModalBody textAlign="center" p={4}>
            <Heading>Are you sure?</Heading>
            <Box p={4}>
              <Text fontSize="lg">
                This will permanently delete your account and all transactions
                under it!
              </Text>
              <FormikInputField
                name="deleteAccount"
                placeholder="Enter DELETE if you wish to proceed."
                elementRef={initialRef}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="red"
              mr={3}
            >
              Delete
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
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
      size="md"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>{body}</ModalContent>
    </Modal>
  );
};
