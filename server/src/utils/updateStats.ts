import {
  TransactionOptions,
  withdrawalOptions,
  transactionType,
} from "../types";
import { getConnection } from "typeorm";

export const updateDeposit = async (
  oldAmount: number,
  newAmount: number,
  newType: transactionType,
  bankAccountId: number,
  userId: number | undefined
) => {
  if (newType === TransactionOptions.DEPOSIT) {
    await getConnection().transaction(async (tm) => {
      await tm.query(
        `
          update bank_account
          set 
          "monthlyDeposits" = "monthlyDeposits" - $3 + $4,
          "currentBalance" = "currentBalance" -$3 + $4
          where "id" = $1 and "creatorId" = $2
          `,
        [bankAccountId, userId, oldAmount, newAmount]
      );
    });
  } else if (
    withdrawalOptions.includes(newType)
    // newType === TransactionOptions.CASH_WITHDRAWAL ||
    // newType === TransactionOptions.CARD_NUMBER_ENTERED ||
    // newType === TransactionOptions.CHECK ||
    // newType === TransactionOptions.POINT_OF_SALE
  ) {
    await getConnection().transaction(async (tm) => {
      await tm.query(
        `
          update bank_account
          set 
          "monthlyDeposits" = "monthlyDeposits" - $3,
          "monthlySpending" = "monthlySpending" + $4,
          "currentBalance" = "currentBalance" - $3 - $4
          where "id" = $1 and "creatorId" = $2
          `,
        [bankAccountId, userId, oldAmount, newAmount]
      );
    });
  }
};

export const updateTransfer = async (
  newAmount: number,
  newType: transactionType,
  bankAccountId: number,
  userId: number | undefined
) => {
  if (newType === TransactionOptions.DEPOSIT) {
    await getConnection().transaction(async (tm) => {
      await tm.query(
        `
          update bank_account
          set 
          "monthlyDeposits" = "monthlyDeposits" + $3,
          "currentBalance" = "currentBalance" + $3
          where "id" = $1 and "creatorId" = $2
          `,
        [bankAccountId, userId, newAmount]
      );
    });
  } else if (
    newType === TransactionOptions.CASH_WITHDRAWAL ||
    newType === TransactionOptions.CARD_NUMBER_ENTERED ||
    newType === TransactionOptions.CHECK ||
    newType === TransactionOptions.POINT_OF_SALE
  ) {
    await getConnection().transaction(async (tm) => {
      await tm.query(
        `
          update bank_account
          set 
          "monthlySpending" = "monthlySpending" + $3,
          "currentBalance" = "currentBalance" - $3
          where "id" = $1 and "creatorId" = $2
          `,
        [bankAccountId, userId, newAmount]
      );
    });
  }
};

export const updateWithdrawal = async (
  oldAmount: number,
  newAmount: number,
  newType: transactionType,
  bankAccountId: number,
  userId: number | undefined
) => {
  if (newType === TransactionOptions.DEPOSIT) {
    await getConnection().transaction(async (tm) => {
      await tm.query(
        `
          update bank_account
          set 
          "monthlyDeposits" = "monthlyDeposits" + $4,
          "monthlySpending" = "monthlySpending" - $3,
          "currentBalance" = "currentBalance" + $3 + $4
          where "id" = $1 and "creatorId" = $2
          `,
        [bankAccountId, userId, oldAmount, newAmount]
      );
    });
  } else if (
    newType === TransactionOptions.CASH_WITHDRAWAL ||
    newType === TransactionOptions.CARD_NUMBER_ENTERED ||
    newType === TransactionOptions.CHECK ||
    newType === TransactionOptions.POINT_OF_SALE
  ) {
    await getConnection().transaction(async (tm) => {
      await tm.query(
        `
          update bank_account
          set 
          "monthlySpending" = "monthlySpending" - $3 + $4,
          "currentBalance" = "currentBalance" + $3 - $4
          where "id" = $1 and "creatorId" = $2
          `,
        [bankAccountId, userId, oldAmount, newAmount]
      );
    });
  }
};
