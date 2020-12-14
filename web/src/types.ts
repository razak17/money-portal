export enum BankAccountOptions {
  CHECKING = "checking",
  CREDIT = "credit",
  SAVINGS = "savings",
}

export enum TransactionOptions {
  CASH_WITHDRAWAL = "cash withdrawal",
  CARD_NUMBER_ENTERED = "card number entered",
  CHECK = "check",
  DEPOSIT = "deposit",
  POINT_OF_SALE = "point of sale",
  TRANSFER = "transfer",
}

export type WrapperVariant = "small" | "regular";

export type BankAccountType =
  | {
      name: string;
      type: string;
      startingBalance: BankAccountOptions | number;
      lowBalanceAlert: number;
    }
  | undefined;

export type UpdateBankAccountType =
  | {
      name: string;
      type: string;
      lowBalanceAlert: number;
    }
  | undefined;

export type TransactionType =
  | {
      amount: number;
      type: string;
      memo: string;
    }
  | undefined;

export type statType = {
  id: string;
  name: string;
  value: string;
};

export type selectOptionsType = {
  id: number;
  value: string;
};
export const accountOptions = [
  BankAccountOptions.CHECKING,
  BankAccountOptions.CREDIT,
  BankAccountOptions.SAVINGS,
];

export const transactionOptions = [
  TransactionOptions.CASH_WITHDRAWAL,
  TransactionOptions.CARD_NUMBER_ENTERED,
  TransactionOptions.CHECK,
  TransactionOptions.DEPOSIT,
  TransactionOptions.POINT_OF_SALE,
  TransactionOptions.TRANSFER,
];

export const withdrawalOptions = [
  "cash withdrawal",
  "card number entered",
  "check",
  "point of sale",
];

export const filterOptions = ["all", "withdrawals", "deposits", "transfers"];
