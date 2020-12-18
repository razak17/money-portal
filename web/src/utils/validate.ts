import * as Yup from "yup";
import {
  BankAccountType,
  UpdateBankAccountType,
  TransactionType,
} from "../types";

export const NewBankAccountSchema: Yup.ObjectSchema<BankAccountType> = Yup.object(
  {
    name: Yup.string()
      .min(2, "must be 2 to 20 characters.")
      .max(20, "must be 2 to 20 characters.")
      .required("please enter account name."),
    type: Yup.string().required("please select account type."),
    startingBalance: Yup.number()
      .min(1, "must be greater than 0.")
      .max(999999999, "must not be greater than 999999999.")
      .required("please enter starting balance."),
    lowBalanceAlert: Yup.number()
      .max(
        Yup.ref("startingBalance"),
        "must not be greater than starting balance"
      )
      .required("please enter low balance alert."),
  }
);

export const updateBankAccountSchema: Yup.ObjectSchema<UpdateBankAccountType> = Yup.object(
  {
    name: Yup.string()
      .min(2, "must be 2 to 20 characters.")
      .max(20, "must be 2 to 20 characters.")
      .required("please enter account name."),
    type: Yup.string().required("please select account type."),
    lowBalanceAlert: Yup.number()
      .max(999999999, "must not be greater than 999999999.")
      .required("please enter low balance alert."),
  }
);

export const AddTransactionSchema: Yup.ObjectSchema<TransactionType> = Yup.object(
  {
    amount: Yup.number()
      .min(1, "must be greater than 0.")
      .max(999999999, "must not be greater than 999999999.")
      .required("please enter an amount."),
    type: Yup.string().required("please select transaction type."),
    memo: Yup.string()
      .min(2, "must be 2 to 20 characters.")
      .max(20, "must be 2 to 20 characters.")
      .required("Please enter memo."),
  }
);

export const EditTransactionSchema: Yup.ObjectSchema<TransactionType> = Yup.object(
  {
    amount: Yup.number()
      .min(1, "must be greater than 0.")
      .max(999999999, "must not be greater than 999999999.")
      .required("Please enter an amount."),
    type: Yup.string().required("please select transaction type."),
    memo: Yup.string()
      .min(2, "must be 2 to 20 characters.")
      .max(20, "must be 2 to 20 characters.")
      .required("Please enter memo."),
  }
);

export const SearchSchema: Yup.ObjectSchema<{ searchQuery: string } | undefined> = Yup.object(
  {
    searchQuery: Yup.string()
      .min(2, "must be 2 to 20 characters.")
      .max(20, "must be 2 to 20 characters.")
      .required("Please enter search query."),
  }
);

