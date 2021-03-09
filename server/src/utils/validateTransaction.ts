import {
  TransactionOptions,
  FilterOptions,
  filterOptions,
  withdrawalOptions,
} from "../types";
import { ALL } from "../constants";

export const validateTransactionQuery = (
  filter: string | null,
  query: string = "placeholder"
) => {
  if (filter && filter.trim().length <= 0) {
    return [
      {
        field: "filter",
        message: "invalid filter(empty)",
      },
    ];
  }
  if (query.trim().length < 2) {
    return [
      {
        field: "query",
        message: "must be at least 2 characters.",
      },
    ];
  }
  if (filter && !filterOptions.includes(filter) && filter != ALL) {
    return [
      {
        field: "filter",
        message: "invalid filter",
      },
    ];
  }
  return null;
};

export const validateTransactionMutation = (
  amount: number,
  type: string,
  memo: string,
  currentBalance: number
) => {
  if (type.trim().length === 0) {
    return [
      {
        field: "type",
        message: "must not be empty.",
      },
    ];
  }
  if (memo.trim().length === 0) {
    return [
      {
        field: "memo",
        message: "must not be empty.",
      },
    ];
  }
  if (memo.trim().length > 20 || memo.trim().length < 2) {
    return [
      {
        field: "memo",
        message: "must be between 2 and 20 characters.",
      },
    ];
  }
  if (amount > currentBalance) {
    return [
      {
        field: "amount",
        message: "not enough funds.",
      },
    ];
  }
  if (
    !withdrawalOptions.includes(type) &&
    type != TransactionOptions.DEPOSIT &&
    type != TransactionOptions.TRANSFER
  ) {
    return [
      {
        field: "type",
        message: "invalid type.",
      },
    ];
  }
  return null;
};

export const validateFilter = (filter: string) => {
  let validatedFilter;
  if (filter != "all") {
    if (filter === FilterOptions.TRANSFERS) {
      validatedFilter = 3;
    } else if (filter === FilterOptions.DEPOSITS) {
      validatedFilter = 2;
    } else if (filter === FilterOptions.WITHDRAWALS) {
      validatedFilter = 1;
    }
  }
  return validatedFilter;
};

export const validateQuery = (query: string) => {
  if (query.trim().length <= 0) {
    return null;
  }
  let validatedQuery;
  validatedQuery = `%${query}%`;
  return validatedQuery;
};

export const validateCategory = (type: string) => {
  let categoryName;
  if (type === TransactionOptions.TRANSFER) {
    categoryName = FilterOptions.TRANSFERS;
  } else if (type === TransactionOptions.DEPOSIT) {
    categoryName = FilterOptions.DEPOSITS;
  } else if (type && withdrawalOptions.includes(type)) {
    categoryName = FilterOptions.WITHDRAWALS;
  }
  return categoryName;
};
