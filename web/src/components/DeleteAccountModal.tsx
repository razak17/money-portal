import { InfoOutlineIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { InputField } from "./common";
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
  const history = useHistory();
  const intId = useGetIntId();
  const [deleteBankAccount] = useDeleteBankAccountMutation();
  const body = (
    <Formik
      initialValues={{ deleteAccount: "Hello" }}
      onSubmit={async (values) => {
        console.log(values);
        if (values.deleteAccount === "DELETE") {
          const { errors } = await deleteBankAccount({
            variables: {
              id: intId,
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
                This will permanently delete your account and all transactions!
              </Text>
              <InputField
                name="deleteAccount"
                placeholder="Enter DELETE if you wish to proceed."
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="blue"
              mr={3}
            >
              Delete
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
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>{body}</ModalContent>
    </Modal>
  );
};
