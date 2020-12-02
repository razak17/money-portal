import * as Yup from "yup";
import { BankAccountType, TransactionType } from "../types";

export const NewBankAccountSchema: Yup.ObjectSchema<BankAccountType> = Yup.object(
  {
    name: Yup.string()
      .min(2, "Must be at least two charaters long.")
      .required("Please enter account name."),
    type: Yup.string().required("Please select account type."),
    startingBalance: Yup.number()
      .min(1, "Must be greater than 0.")
      .required("Please enter a number."),
    lowBalanceAlert: Yup.number()
      .max(
        Yup.ref("startingBalance"),
        "Must not be greater than starting balance"
      )
      .required("Please Enter a number."),
  }
);

export const AddTransactionSchema: Yup.ObjectSchema<TransactionType> = Yup.object(
  {
    amount: Yup.number()
      .min(1, "Must be greater than 0.")
      .required("Please enter an amount."),
    type: Yup.string().required("Please select transaction type."),
    memo: Yup.string().required("Please enter memo."),
  }
);
