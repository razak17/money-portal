import * as React from "react";
import { IconButton, Text, chakra } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import { transactionOptions } from "../../types";
import { EditTransactionSchema } from "../../utils/validate";
import { InputField, SelectField } from "../partials";
import { useUpdateTransactionMutation } from "../../generated/graphql";
import { useGetIntId, getRound, toErrorMap } from "../../utils";
import dayjs from 'dayjs'

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
    <chakra.td textAlign="left" p="1em 0.5em">
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
      amount: getRound(amount),
      type,
      memo,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: EditTransactionSchema,
    onSubmit: async (values, actions) => {
      const response = await updateTransaction({
        variables: {
          input: {
            ...values,
            amount: parseFloat(values.amount),
          },
          id,
          bankAccountId: intId,
        },
        update: (cache) => {
          cache.evict({ fieldName: "transactions" });
          cache.evict({ fieldName: "bankAccount" });
          cache.gc();
        },
      });
      if (response.data?.updateTransaction.errors) {
        actions.setErrors(toErrorMap(response.data.updateTransaction.errors));
      } else {
        setEditing(false);
      }
    },
  });

  const { getFieldProps, handleSubmit, isSubmitting, errors } = formik;

  return (
    <chakra.tr borderWidth="1px" borderRadius="md">
      <chakra.td textAlign="center" p="0.5em">
        <IconButton
          fontSize="sm"
          mr={2}
          isLoading={isSubmitting}
          onClick={() => handleSubmit()}
          type="submit"
          colorScheme="teal"
          icon={<CheckIcon />}
          aria-label="Confirm Edit Transaction"
        />
        <IconButton
          fontSize="sm"
          colorScheme="red"
          onClick={() => setEditing(false)}
          type="submit"
          icon={<CloseIcon />}
          aria-label="Cancel Edit Transaction"
        />
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
        <Text fontSize="sm">
          {dayjs(new Date(parseInt(updatedAt))).format("dddd, MMMM D YYYY")}
        </Text>
        <Text fontSize="xs">{dayjs(new Date(parseInt(updatedAt))).format("h:mm:ss A")}</Text>
      </TableData>
    </chakra.tr>
  );
};
