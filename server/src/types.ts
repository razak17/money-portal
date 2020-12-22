import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import { createUserLoader } from "./utils/createUserLoader";
import { createBankAccountLoader } from "./utils/createBankAccountLoader";
import { createTransactionCategoryLoader } from "./utils/createTransactionCategoryLoader";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  bankAccountLoader: ReturnType<typeof createBankAccountLoader>;
  transactionCategoryLoader: ReturnType<typeof createTransactionCategoryLoader>;
};

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

export enum FilterOptions {
  WITHDRAWALS = "withdrawals",
  DEPOSITS = "deposits",
  TRANSFERS = "transfers",
}

export const bankAccountOptions = ["checking", "credit", "savings"];

export const withdrawalOptions = [
  "cash withdrawal",
  "card number entered",
  "check",
  "point of sale",
];

export const filterOptions = [
  "withdrawals",
  "deposits",
  "transfers",
];

export type accountType =
  | BankAccountOptions.CHECKING
  | BankAccountOptions.CREDIT
  | BankAccountOptions.SAVINGS;

export type transactionType =
  | TransactionOptions.CASH_WITHDRAWAL
  | TransactionOptions.CARD_NUMBER_ENTERED
  | TransactionOptions.CHECK
  | TransactionOptions.DEPOSIT
  | TransactionOptions.POINT_OF_SALE
  | TransactionOptions.TRANSFER;
