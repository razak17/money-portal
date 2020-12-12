import * as React from "react";
import { Box, IconButton, Heading, Text, chakra } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import { transactionOptions } from "../types";
import { EditTransactionSchema } from "../utils/validate";
import { InputField, SelectField } from "./";
import { useUpdateTransactionMutation } from "../generated/graphql";
import { useGetIntId } from "../utils/useGetIntId";

interface Props {
  id: number;
  amount: number;
  type: string;
  memo: string;
  updatedAt: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  inputFieldRef: React.RefObject<HTMLInputElement>;
}

const TableData: React.FC = ({ children }) => {
  return (
    <chakra.td textAlign="left" p="1.5em 0.5em">
      {children}
    </chakra.td>
  );
};

export const EditTransactionView: React.FC<Props> = ({
  id,
  amount,
  type,
  memo,
  updatedAt,
  setEditing,
  inputFieldRef,
}) => {
  const intId = useGetIntId();
  const [updateTransaction] = useUpdateTransactionMutation();

  const formik = useFormik({
    initialValues: {
      amount,
      type,
      memo,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: EditTransactionSchema,
    onSubmit: async (values, actions) => {
      console.log(values);
      const { errors } = await updateTransaction({
        variables: {
          id,
          bankAccountId: intId,
          ...values,
        },
        update: (cache) => {
          cache.evict({ fieldName: "transactions" });
          cache.evict({ fieldName: "bankAccount" });
          cache.gc();
        },
      });
      if (!errors) {
      }
    },
  });

  const { getFieldProps, handleSubmit, isSubmitting, errors } = formik;

  return (
    <chakra.tr borderWidth="1px" borderRadius="md">
      <chakra.td textAlign="center" p="0.5em">
        <Box p="0.5em">
          <IconButton
            isLoading={isSubmitting}
            onClick={() => handleSubmit()}
            type="submit"
            colorScheme="teal"
            icon={<CheckIcon />}
            aria-label="Confirm Edit Transaction"
          />
        </Box>
        <Box p="0.5em">
          <IconButton
            colorScheme="red"
            onClick={() => setEditing(false)}
            type="submit"
            icon={<CloseIcon />}
            aria-label="Cancel Edit Transaction"
          />
        </Box>
      </chakra.td>
      <TableData>
        <InputField
          amount
          elementRef={inputFieldRef}
          {...getFieldProps("amount")}
          name="amount"
          error={errors.amount}
        />
      </TableData>
      <TableData>
        <SelectField
          {...getFieldProps("type")}
          name="type"
          error={errors.type}
          selectOptions={transactionOptions}
        />
      </TableData>
      <TableData>
        <InputField
          {...getFieldProps("memo")}
          name="memo"
          error={errors.memo}
        />
      </TableData>
      <TableData>
        <Heading size="xs">
          {new Date(parseInt(updatedAt)).toISOString()}
        </Heading>
        <Text fontSize="sm">{updatedAt}</Text>
      </TableData>
    </chakra.tr>
  );
};
