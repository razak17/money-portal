export enum BankAccountOptions {
  CHECKING = "Checking",
  CREDIT = "Credit",
  SAVINGS = "Savings",
}

export enum TransactionOptions {
  CASH_WITHDRAWAL = "Cash Withdrawal",
  CARD_NUMBER_ENTERED = "Card Number Entered",
  CHECK = "Check",
  DEPOSIT = "Deposit",
  POINT_OF_SALE = "Point of Sale",
  TRANSFER = "Transfer",
}

export type BankAccountType =
  | {
      name: string;
      type: string;
      startingBalance: BankAccountOptions | number;
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

// export const accountOptions = [
// { id: 1, value: BankAccountOptions.CHECKING },
// { id: 2, value: BankAccountOptions.CREDIT },
// { id: 3, value: BankAccountOptions.SAVINGS },
// ];

export const accountOptions = [
  BankAccountOptions.CHECKING,
  BankAccountOptions.CREDIT,
  BankAccountOptions.SAVINGS,
];

// const transactionOptions = [
// { id: 1, value: TransactionOptions.CASH_WITHDRAWAL },
// { id: 2, value: TransactionOptions.CHECK },
// { id: 3, value: TransactionOptions.DEPOSIT },
// { id: 4, value: TransactionOptions.POINT_OF_SALE },
// { id: 5, value: TransactionOptions.TRANSFER },
// ];

export const transactionOptions = [
  TransactionOptions.CASH_WITHDRAWAL,
  TransactionOptions.CARD_NUMBER_ENTERED,
  TransactionOptions.CHECK,
  TransactionOptions.DEPOSIT,
  TransactionOptions.POINT_OF_SALE,
  TransactionOptions.TRANSFER,
];

export const statOptions = [
  { id: "1", name: "Current Balalnce", value: "$272,00.48" },
  { id: "2", name: "Monthly Spending", value: "$22,00.48" },
  { id: "3", name: "Monthly Deposits", value: "$17,00.48" },
  { id: "4", name: "Monthly Transactions", value: "22" },
];

// Hello
export const filterOptions = [
  { id: "1", name: "All", active: true },
  { id: "2", name: "Withdrawals", active: false },
  { id: "3", name: "Deposits", active: false },
  { id: "4", name: "Transfers", active: false },
];

export const transactionList = [
  {
    id: "1",
    amount: "$222",
    memo: "memo",
    date: "Tuesday, 17 November 2020",
    time: "6:45PM",
  },
  {
    id: "2",
    amount: "$222",
    memo: "memo",
    date: "Tuesday, 17 November 2020",
    time: "6:45PM",
  },
  {
    id: "3",
    amount: "$222",
    memo: "memo",
    date: "Tuesday, 17 November 2020",
    time: "6:45PM",
  },
  {
    id: "4",
    amount: "$222",
    memo: "memo",
    date: "Tuesday, 17 November 2020",
    time: "6:45PM",
  },
  {
    id: "5",
    amount: "$222",
    memo: "memo",
    date: "Tuesday, 17 November 2020",
    time: "6:45PM",
  },
];
