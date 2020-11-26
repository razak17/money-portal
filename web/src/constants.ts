export enum BankAccountOptions {
  CHECKING = "Checking",
  CREDIT = "Credit",
  SAVINGS = "Savings",
}

export type BankAccount =
  | {
      name: string;
      type: string;
      startingBalance: BankAccountOptions | number;
      lowBalanceAlert: number;
    }
  | undefined;

export const accountOptions = [
  { id: 1, value: BankAccountOptions.CHECKING },
  { id: 2, value: BankAccountOptions.CREDIT },
  { id: 3, value: BankAccountOptions.SAVINGS },
];
