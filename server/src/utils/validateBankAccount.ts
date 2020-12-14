import { BankAccountInput } from "../resolvers/BankAccountInput";
import { bankAccountOptions, BankAccountOptions } from "../types";

export const validateNew = (input: BankAccountInput) => {
  if (input.name.trim().length < 2) {
    return [
      {
        field: "name",
        message: "must be 2 to 20 characters.",
      },
    ];
  }
  if (input.startingBalance <= 0) {
    return [
      {
        field: "startingBalance",
        message: "must be greater than 0.",
      },
    ];
  }
  if (input.lowBalanceAlert < 0) {
    return [
      {
        field: "lowBalanceAlert",
        message: "cannot be less than 0.",
      },
    ];
  }
  if (!bankAccountOptions.includes(input.type)) {
    return [
      {
        field: "type",
        message: "invalid bank account type.",
      },
    ];
  }
  if (input.lowBalanceAlert > input.startingBalance) {
    return [
      {
        field: "lowBalanceAlert",
        message: "cannot be greater than starting balance.",
      },
    ];
  }

  return null;
};

export const validateUpdate = (
  name: string,
  type: BankAccountOptions,
  lowBalanceAlert: number | undefined,
  currentBalance: number | undefined
) => {
  if (name.trim().length < 2) {
    return [
      {
        field: "name",
        message: "must be 2 to 20 characters.",
      },
    ];
  }
  if (!bankAccountOptions.includes(type)) {
    return [
      {
        field: "type",
        message: "invalid bank account type.",
      },
    ];
  }
  if (lowBalanceAlert && currentBalance) {
    if (lowBalanceAlert > currentBalance) {
      return [
        {
          field: "lowBalanceAlert",
          message: "cannot be greater than current balance.",
        },
      ];
    }
  }

  return null;
};
