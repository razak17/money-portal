import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import { createUserLoader } from "./utils/createUserLoader";
import { createBankAccountLoader } from "./utils/createBankAccountLoader";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  bankAccountLoader: ReturnType<typeof createBankAccountLoader>;
};

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
